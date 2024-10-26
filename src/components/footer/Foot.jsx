import { Footer } from "flowbite-react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
const Foot = () => {
    return (
      <Footer container className="bg-[#304d30]">
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
            <Footer.Brand
              href="/"
              src="/Logo.png"
              alt="Mediore Logo"
            />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title className="text-white" title="about" />
              <Footer.LinkGroup col>
                <Footer.Link className="text-white" href="#">Emperal Tech</Footer.Link>
                <Footer.Link className="text-white" href="#">Tailwind CSS</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title className="text-white" title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link className="text-white" href="#">Github</Footer.Link>
                <Footer.Link className="text-white" href="#">Discord</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title className="text-white" title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link className="text-white" href="#">Privacy Policy</Footer.Link>
                <Footer.Link className="text-white" href="#">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright className="text-white" href="https://emperaltech.com/" by="Emperal Tech™" year={2024} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon className="text-white" href="#" icon={BsFacebook} />
            <Footer.Icon className="text-white" href="#" icon={BsInstagram} />
            <Footer.Icon className="text-white" href="#" icon={BsTwitter} />
            <Footer.Icon className="text-white" href="#" icon={BsGithub} />
            <Footer.Icon className="text-white" href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
    );
};

export default Foot;