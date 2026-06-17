
import Navbar from "../components/layout/Navbar/Navbar";

function NavbarHoc (Comp){

return function NavbarAttacher()
{
return(
<>

<Navbar/>
<Comp/>

</>)

}


}

export default NavbarHoc;