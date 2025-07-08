import { useEffect, useState } from "react";
import { BorderBeam } from "../magicui/border-beam";
import { PiSpinnerBold } from "react-icons/pi";
import { CgClose } from "react-icons/cg";
import { ConfettiButton } from "./confetti";
import axios from "axios";

interface RegFormModelProps {
  closeModel: () => void;
}

export default function RegFormModel({ closeModel }: RegFormModelProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isNumberValid, setIsNumberValid] = useState(true);
  const [previousSite, setPreviousSite] = useState("");
  //get previous site
  useEffect(() => {
    document.referrer;
    setPreviousSite(document.referrer);
  }, []);
  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };
  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };
  const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //validate phone number
    const number = e.target.value;
    if (validatePhoneNumber(number)) {
      setIsNumberValid(true);
    } else {
      setIsNumberValid(false);
    }
    setWhatsapp(number);
  };
  //validate phone number
  const validatePhoneNumber = (number: string) => {
    const regEx = /^[0-9]{10}$/;
    return regEx.test(number);
  };
  const register = async () => {
		//add facebook pixel event trigger
		window.fbq("track", "CompleteRegistration");

		try {
			if (!isLoading) {
				setIsLoading(true);
				const response = await axios.post(
					`${process.env.NEXT_PUBLIC_API_URL}/leeds`,
					{
						firstName,
						lastName,
						phoneNumber: whatsapp,
						time: new Date().toLocaleString(),
						previousSite: previousSite,
					}
				);
				console.log(response);
			}
		} catch (error) {
			console.error("Error registering:", error);
		} finally {
			setIsLoading(false);
			const whatsappLink = "https://chat.whatsapp.com/IkIerAymwGu4QCVyRg36dx";
			window.location.href = whatsappLink;
		}
	};

  return (
    <div className="fixed top-0 w-[100vw] h-[100vh] bg-[#00000065] z-[100] flex justify-center items-center ">
      <div className="w-[90%] lg:w-[600px] p-10 lg:p-20 shadow-2xl relative rounded-xl z-50 lg:max-w-[1160px] overflow-hidden bg-white model">
        <h1 className="absolute top-5 lg:top-8 left-0 text-sm lg:text-2xl font-semibold w-full text-center">
          පාඨමාලාවට ලියාපදිංචි වන්න
        </h1>
        <button
          className="absolute top-5 right-5 hover:text-red-700"
          onClick={closeModel}
        >
          <CgClose size={25} />
        </button>
        <BorderBeam size={300} duration={5} />
        <div className="flex flex-col justify-center items-start text-sm">
          <label htmlFor="first-name" className="font-semibold">
            First Name
          </label>
          <input
            type="text"
            id="first-name"
            className="w-full p-2 mt-2 border rounded-md border-gray-400"
            placeholder="First Name"
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </div>
        <div className="flex flex-col justify-center items-start text-sm mt-4">
          <label htmlFor="last-name" className="font-semibold">
            Last Name
          </label>
          <input
            type="text"
            id="last-name"
            className="w-full p-2 mt-2 border rounded-md border-gray-400 "
            placeholder="Last Name"
            value={lastName}
            onChange={handleLastNameChange}
          />
        </div>
        {/* whatsapp number */}
        <div className="flex flex-col justify-center items-start text-sm mt-4">
          <label htmlFor="phone" className="font-semibold">
            Whatsapp Number
          </label>
          <input
            type="text"
            id="phone"
            className="w-full p-2 mt-2 border rounded-md border-gray-400 "
            placeholder="Enter your WhatsApp number"
            value={whatsapp}
            onChange={handleWhatsappChange}
          />
          {!isNumberValid && (
            <p className="text-red-500 text-xs mt-1">
              Please enter a valid phone number
            </p>
          )}
        </div>
        <div className="flex justify-center items-center mt-5">
          <ConfettiButton
            className={`bg-[#18bd5b] text-white min-h-10 p-2 px-5 rounded-md w-full hover:bg-[#1d5834] flex justify-center items-center ${
              isLoading ? "bg-[#1d5834]" : ""
            }`}
            register={register}
          >
            {isLoading ? (
              <PiSpinnerBold className="animate-spin mr-2" size={25} />
            ) : (
              "Enroll Me!"
            )}
          </ConfettiButton>
        </div>
      </div>
    </div>
  );
}
