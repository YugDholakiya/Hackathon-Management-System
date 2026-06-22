import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export const API = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Add interceptor to include token in requests
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      
      // Prevent redirect loops on public routes
      const currentPath = window.location.pathname;
      const isPublicPath = 
        currentPath === "/login" || 
        currentPath === "/register" || 
        currentPath === "/" || 
        currentPath === "/hackathons" || 
        currentPath.startsWith("/viewDetailPage");
        
      if (!isPublicPath) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// Mappings translation layer between Mock JSON URL format and PostgreSQL Express API format
const mapEndpointAndExecute = async (method, endpoint, inputData) => {
  let url = endpoint;
  
  // Clean up full local mock URLs to relative routes
  if (url.startsWith("http://localhost:8000")) {
    url = url.substring("http://localhost:8000".length);
  }
  if (url.startsWith("http://localhost:8000/api")) {
    url = url.substring("http://localhost:8000/api".length);
  }
  if (url.startsWith("/api")) {
    url = url.substring(4);
  }

  if (method === "GET") {
    // 1. LOGIN MOCK BYPASS
    if (url.startsWith("/participants?") || url.startsWith("/hosts?") || url.startsWith("/admin?")) {
      const params = new URLSearchParams(url.split("?")[1]);
      const email = params.get("email");
      const password = params.get("password");
      try {
        const res = await API.post("/auth/login", { email, password });
        if (res.data && res.data.token) {
          localStorage.setItem("token", res.data.token);
        }
        
        let fullUser = res.data.user;
        try {
          const profileRes = await API.get(`/users/${res.data.user.id}`);
          if (profileRes.data && profileRes.data.user) {
            fullUser = profileRes.data.user;
          }
        } catch (e) {
          console.error("Failed to fetch full profile details on login", e);
        }

        const mappedUser = {
          id: fullUser.id,
          firstName: fullUser.firstName,
          email: fullUser.email,
          roles: [fullUser.role],
          pastHackathons: [],
          wonHackathons: [],
          gender: "",
          phoneNumber: fullUser.phoneNumber || "",
          description: fullUser.about || fullUser.description || "",
          tagline: fullUser.tagline || "",
          designation: fullUser.designation || "",
          about: fullUser.about || ""
        };
        return {
          success: true,
          data: [mappedUser],
          error: null,
        };
      } catch (err) {
        return {
          success: false,
          data: null,
          error: err.response?.data?.message || "Login failed",
        };
      }
    }

    // 2. GET PARTICIPANTS OR HOSTS LIST
    if (url === "/participants" || url === "/hosts") {
      try {
        const res = await API.get("/users");
        const role = url === "/participants" ? "participant" : "host";
        const filtered = (res.data.users || []).filter(u => u.role === role).map(u => ({
          id: u.id,
          firstName: u.firstName,
          email: u.email,
          roles: [u.role],
          pastHackathons: [],
          wonHackathons: [],
          gender: "",
          phoneNumber: u.phoneNumber || "",
          description: u.about || u.description || "",
          tagline: u.tagline || "",
          designation: u.designation || "",
          about: u.about || "",
          hackathons: []
        }));
        return {
          success: true,
          data: filtered,
          error: null,
        };
      } catch (err) {
        return {
          success: false,
          data: null,
          error: err.response?.data?.message || "Failed to fetch users",
        };
      }
    }

    // 3. GET ALL HACKATHONS
    if (url === "/hackathons") {
      try {
        const res = await API.get("/hackathons");
        const list = res.data.hackathons || [];
        const mapped = list.map(h => ({
          id: h.id,
          hackathonStatus: h.status === 'ongoing' ? 'Open' : h.status === 'upcoming' ? 'UpComing' : h.status === 'completed' ? 'Closed' : 'Open',
          hostId: h.hostId,
          name: h.title,
          tagline: h.tagline || (h.description ? h.description.slice(0, 50) : ''),
          description: h.description || '',
          prize: {
            "1st": h.prizePool ? `${h.prizePool} pool` : '',
            "2nd": ''
          },
          prizes: {
            prizePool: h.prizePool ? parseFloat(h.prizePool) : 0,
            perks: h.perks ? (Array.isArray(h.perks) ? h.perks : [h.perks]) : ["no other perks"]
          },
          techstacks: h.category ? [h.category] : [],
          dates: {
            registrationStart: h.registrationStart || h.startDate,
            registrationEnd: h.registrationEnd || h.endDate,
            hackathonStart: h.startDate,
            hackathonEnd: h.endDate
          },
          teamSize: {
            max: h.maxParticipants || 4,
            min: 1
          },
          mode: h.location === 'online' ? 'online' : 'offline',
          location: h.location
        }));
        return {
          success: true,
          data: mapped,
          error: null,
        };
      } catch (err) {
        return {
          success: false,
          data: null,
          error: err.response?.data?.message || "Failed to fetch hackathons",
        };
      }
    }

    // 4. GET SINGLE HACKATHON APPLICATION
    if (url.startsWith("/hackathonApplications/")) {
      const parts = url.split("/");
      const id = parts[parts.length - 1];
      try {
        const res = await API.get(`/participation/application/${id}`);
        const r = res.data.participation;
        if (!r) throw new Error("Application not found");
        return {
          success: true,
          data: {
            id: r.id,
            hackathonId: r.hackathonId,
            hackathonName: r.hackathon?.title || 'Hackathon',
            applicationStatus: r.status,
            leaderId: r.userId,
            leadeName: r.teamName || r.participant?.firstName || 'User',
            teamDetails: r.teamDetails || [
              {
                name: r.participant?.firstName || 'User',
                email: r.participant?.email || '',
                gender: r.participant?.gender || 'Male'
              }
            ],
            problemStatementAbstract: r.problemStatementAbstract || 'No description',
            solutionStatement: '',
            technologyUsed: r.technologyUsed || []
          },
          error: null
        };
      } catch (err) {
        return {
          success: false,
          data: null,
          error: err.response?.data?.message || "Failed to fetch application details"
        };
      }
    }

    // 5. GET HACKATHON APPLICATIONS LIST
    if (url === "/hackathonApplications") {
      const token = localStorage.getItem("token");
      if (!token) {
        return {
          success: true,
          data: [],
          error: null,
        };
      }
      try {
        const res = await API.get("/participation");
        const list = res.data.participations || [];
        const mapped = list.map(r => ({
          id: r.id,
          hackathonId: r.hackathonId,
          hackathonName: r.hackathon?.title || 'Hackathon',
          applicationStatus: r.status,
          leaderId: r.userId,
          leadeName: r.teamName || r.participant?.firstName || 'User',
          teamDetails: r.teamDetails || [
            {
              name: r.participant?.firstName || 'User',
              email: r.participant?.email || '',
              gender: r.participant?.gender || 'Male'
            }
          ],
          problemStatementAbstract: r.problemStatementAbstract || 'No description',
          solutionStatement: '',
          technologyUsed: r.technologyUsed || []
        }));
        return {
          success: true,
          data: mapped,
          error: null,
        };
      } catch (err) {
        return {
          success: true,
          data: [],
          error: null,
        };
      }
    }
  }

  if (method === "POST") {
    let parsedData = inputData;
    if (typeof inputData === "string") {
      try {
        parsedData = JSON.parse(inputData);
      } catch (e) {}
    }

    // 1. REGISTER MOCK BYPASS
    if (url === "/participants" || url === "/hosts") {
      const role = url === "/participants" ? "participant" : "host";
      const registerPayload = {
        firstName: parsedData.firstName || parsedData.Name || "User",
        email: parsedData.email,
        password: parsedData.password,
        role: role
      };
      try {
        const res = await API.post("/auth/register", registerPayload);
        if (res.data && res.data.token) {
          localStorage.setItem("token", res.data.token);
        }
        return {
          success: true,
          data: res.data.user,
          error: null,
        };
      } catch (err) {
        return {
          success: false,
          data: null,
          error: err.response?.data?.error || err.response?.data?.message || "Registration failed",
        };
      }
    }

    // 2. ADD HACKATHON
    if (url === "/hackathons") {
      const hackathonPayload = {
        title: parsedData.name,
        description: parsedData.description,
        startDate: parsedData.dates?.hackathonStart || new Date(),
        endDate: parsedData.dates?.hackathonEnd || new Date(),
        registrationStart: parsedData.dates?.registrationStart || new Date(),
        registrationEnd: parsedData.dates?.registrationEnd || new Date(),
        location: parsedData.location || parsedData.mode || 'online',
        category: parsedData.techstacks?.[0] || 'General',
        prizePool: parseFloat(parsedData.prizes?.prizePool) || parseFloat(parsedData.prizes) || 0,
        maxParticipants: parsedData.teamSize?.max || 4,
        tagline: parsedData.tagline,
        perks: parsedData.perks || parsedData.prizes?.perks
      };
      try {
        const res = await API.post("/hackathons", hackathonPayload);
        return {
          success: true,
          data: res.data.hackathon,
          error: null,
        };
      } catch (err) {
        return {
          success: false,
          data: null,
          error: err.response?.data?.error || err.response?.data?.message || "Failed to create hackathon",
        };
      }
    }

    // 3. ADD HACKATHON APPLICATION
    if (url === "/hackathonApplications") {
      const registrationPayload = {
        hackathonId: parsedData.hackathonId,
        teamName: parsedData.leadeName || parsedData.name || 'Team',
        problemStatementAbstract: parsedData.problemStatementAbstract,
        teamDetails: parsedData.teamDetails,
        technologyUsed: parsedData.technologyUsed
      };
      try {
        const res = await API.post("/participation/register", registrationPayload);
        return {
          success: true,
          data: res.data.participation,
          error: null,
        };
      } catch (err) {
        return {
          success: false,
          data: null,
          error: err.response?.data?.error || err.response?.data?.message || "Failed to register for hackathon",
        };
      }
    }
  }

  if (method === "PUT") {
    if (url.startsWith("/hackathonApplications/")) {
      const parts = url.split("/");
      const id = parts[parts.length - 1];
      let parsedData = inputData;
      if (typeof inputData === "string") {
        try {
          parsedData = JSON.parse(inputData);
        } catch (e) {}
      }
      try {
        const res = await API.put(`/participation/application/${id}/status`, {
          status: parsedData.applicationStatus
        });
        return {
          success: true,
          data: res.data,
          error: null,
        };
      } catch (err) {
        return {
          success: false,
          data: null,
          error: err.response?.data?.error || err.response?.data?.message || "Failed to update application status",
        };
      }
    }
  }

  if (method === "DELETE") {
    if (url.startsWith("/participants/") || url.startsWith("/hosts/") || url.startsWith("/hackathonApplications/")) {
      return {
        success: true,
        data: { message: "Deleted successfully" },
        error: null,
      };
    }
  }

  // General Fallback
  try {
    let res;
    if (method === "GET") {
      res = await API.get(url);
    } else if (method === "POST") {
      res = await API.post(url, inputData);
    } else if (method === "PUT") {
      res = await API.put(url, inputData);
    } else if (method === "PATCH") {
      res = await API.patch(url, inputData);
    } else if (method === "DELETE") {
      res = await API.delete(url);
    }
    return {
      success: true,
      data: res.data,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error.response?.data?.error || error.response?.data?.message || `Failed to ${method.toLowerCase()} data`,
    };
  }
};

// Generic request methods
export const getMethod = async (endpoint) => {
  return mapEndpointAndExecute("GET", endpoint);
};

export const postMethod = async (endpoint, data) => {
  return mapEndpointAndExecute("POST", endpoint, data);
};

export const putMethod = async (endpoint, data) => {
  return mapEndpointAndExecute("PUT", endpoint, data);
};

export const patchMethod = async (endpoint, data) => {
  return mapEndpointAndExecute("PATCH", endpoint, data);
};

export const deleteMethod = async (endpoint) => {
  return mapEndpointAndExecute("DELETE", endpoint);
};

// Auth Methods
export const registerUser = async (userData) => {
  return postMethod("/auth/register", userData);
};

export const loginUser = async (credentials) => {
  const response = await postMethod("/auth/login", credentials);
  if (response.success) {
    localStorage.setItem("token", response.data.token);
  }
  return response;
};

// User Methods
export const getUserProfile = async () => {
  return getMethod("/auth/profile");
};

// Hackathon Methods
export const getHackathons = async () => {
  return getMethod("/hackathons");
};

export const getHackathonById = async (id) => {
  return getMethod(`/hackathons/${id}`);
};

export const searchHackathons = async (query, category, status) => {
  const params = new URLSearchParams();
  if (query) params.append("query", query);
  if (category) params.append("category", category);
  if (status) params.append("status", status);
  return getMethod(`/hackathons/search?${params.toString()}`);
};

export const createHackathon = async (hackathonData) => {
  return postMethod("/hackathons", hackathonData);
};

export const updateHackathon = async (id, hackathonData) => {
  return putMethod(`/hackathons/${id}`, hackathonData);
};

export const deleteHackathon = async (id) => {
  return deleteMethod(`/hackathons/${id}`);
};

// Participation Methods
export const registerForHackathon = async (hackathonId, teamName) => {
  return postMethod("/participation/register", { hackathonId, teamName });
};

export const getUserRegistrations = async () => {
  return getMethod("/participation/user/registrations");
};

export const getHackathonParticipants = async (hackathonId) => {
  return getMethod(`/participation/${hackathonId}/participants`);
};

export const withdrawFromHackathon = async (hackathonId) => {
  return deleteMethod(`/participation/${hackathonId}/withdraw`);
};

// User Methods
export const getAllUsers = async () => {
  return getMethod("/users");
};

export const getUserById = async (id) => {
  return getMethod(`/users/${id}`);
};

export const updateUserProfile = async (profileData) => {
  return putMethod("/users/profile", profileData);
};

export const getHostProfile = async (hostId) => {
  return getMethod(`/users/host/${hostId}`);
};

export const getUsers = async (role, url) => {
  return mapEndpointAndExecute("GET", url);
};

export const updateApplication = async (endpoint, data) => {
  return putMethod(endpoint, data);
};

export const getApplication = async (endpoint) => {
  return getMethod(endpoint);
};

export const deleteUser = async (endpoint) => {
  return deleteMethod(endpoint);
};