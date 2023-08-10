import 'remixicon/fonts/remixicon.css'
const Navbar = () => {
    return (
        <div className="w-full md:w-4/5 flex item-center justify-between my-2 rounded-full py-4 box-border bg-white">
            <a href=" " className=' flex items-center w-8 ml-6'>
                <img src={require("../asset/code-forces.svg").default} alt="" />
            </a>
            {/* 🕵️ */}
            <h1 className="text-2xl mt-2 font-semibold">CF Analyser</h1>
            <button className='bg-themeYellow-400 px-2 py-2 mr-4 rounded-full text-lg'>
                <a href="https://github.com/Wxld/CodeforcesAnalyzer" className='mx-2 flex items-center'>
                    <i className="ri-github-fill text-xl mr-1"></i>Github
                </a>
            </button>
        </div>
    );
}
 
export default Navbar;