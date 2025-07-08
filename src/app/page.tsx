"use client";
import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import axios from "axios";

// Declare the fbq property on the Window interface
declare global {
	interface Window {
		fbq: (event: string, action: string) => void;
	}
}
import Image from "next/image";
import { BorderBeam } from "@/components/magicui/border-beam";
import { PiSpinnerBold } from "react-icons/pi";
import zoom from "./assets/images/zoom.png";
import reviews from "./assets/data/reviews";
import Marquee from "@/components/magicui/marquee";
// import ReviewCard from "./ui/ReviewCart";

import {
	AccordionContent,
	AccordionTrigger,
	Accordion,
	AccordionItem,
} from "@/components/ui/accordion";
import { TbPointFilled } from "react-icons/tb";
import RegFormModel from "@/components/ui/regformmodel";
import ReviewCard from "./ui/ReviewCart";
import { ConfettiButton } from "@/components/ui/confetti";

export default function Home() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [whatsapp, setWhatsapp] = useState("");
	const [isNumberValid, setIsNumberValid] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [isModelOpened, setIsModelOpened] = useState(false);
	const [previousSite, setPreviousSite] = useState("");
	useEffect(() => {
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
		<>
			<header className=" w-full h-[80px] lg:h-[150px] bg-[#0f121f] border flex justify-center items-center">
				<Image
					src="/logo.png"
					alt="logo"
					width={150}
					height={150}
					className="w-[90px] lg:w-[200px]"
				/>
			</header>
			<div className="max-w-[1160px] flex justify-center items-center flex-col mx-auto">
				<h1 className="text-2xl lg:text-4xl font-extrabold text-center mt-10">
					Artificial Intelligence & Machine Learning මුල සිට සරලව👇
				</h1>
				<h2 className="text-xl lg:text-2xl font-bold text-center mt-4">
					මාස 2කින් AI & ML Stack ප්‍රවීණයෙක් වෙන්න.
				</h2>
				<h3 className="text-lg lg:text-xl  text-center ">
					Course Duration : 8 Weeks
				</h3>
				{/* course fee not 7500/- yes 4900/- */}
				<h3 className="text-lg lg:text-xl  text-center ">
					Course Fee :<span className="line-through mr-2">7900/-</span>{" "}
					<span className="text-red-700 font-semibold">4900/-</span>
				</h3>
				{/* starting on: October 1st tuesday - 5:00PM */}
				<h3 className="text-lg lg:text-xl mt-3  text-center ">
					Starting on: August 9th Saturday - 7:00PM
				</h3>
				{/* Three days a week */}
				<h3 className="text-lg lg:text-xl font-semibold lg:font-bold   text-center ">
					සතියට දින 2ක් පංති පැවැත්වේ
				</h3>
				{/* tue 5-7pm , fri 5-7pm , sun 5-7PM */}
				<h3 className="text-lg lg:text-xl  text-center ">
					Wednesday, Saturday
				</h3>
				<h3 className="text-lg lg:text-xl  text-center ">7:00PM - 9:00PM</h3>
				<Image
					src={zoom}
					alt="zoom logo"
					width={150}
					height={150}
					className="w-[90px] lg:w-[120px]"
				/>
			</div>
			{isModelOpened && (
				<RegFormModel closeModel={() => setIsModelOpened(false)} />
			)}
			<div className="max-w-[1160px] flex flex-col justify-center items-center mt-5 mx-auto">
				<div className="w-[90%] lg:w-[600px] p-10 lg:p-20 shadow-2xl relative rounded-xl z-50 lg:max-w-[1160px] overflow-hidden">
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
							WhatsApp Number
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
				<h1 className="text-2xl lg:text-4xl font-extrabold text-center mt-8 ">
					SUCCESSFUL STUDENT TESTIMONIALS
				</h1>
				<div className="relative flex mt-8  w-[90%] max-w-[1160px] flex-wrap h-[250px] items-center justify-center overflow-hidden rounded-lg bg-background ">
					<Marquee pauseOnHover className="[--duration:25s] ">
						{reviews.map((review) => (
							<ReviewCard key={review.username} {...review} />
						))}
					</Marquee>
					<div className="hidden lg:block pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
					<div className="hidden lg:block pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
					<div className="block lg:hidden pointer-events-none absolute inset-y-0 left-0 w-[15%] bg-gradient-to-r from-white dark:from-background"></div>
					<div className="block lg:hidden pointer-events-none absolute inset-y-0 right-0 w-[15%] bg-gradient-to-l from-white dark:from-background"></div>
				</div>
				{/* <div className="w-[90%]  lg:max-w-[1160px]  lg:w-full aspect-[3/2]">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/Rgx8dpiPwpA"
              title="a day in the life of an engineer working from home"
              style={{ border: '0' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div> */}
				<div className="flex flex-col justify-center items-center  w-full max-w-[1160px] mx-auto">
					<h1 className="text-2xl lg:text-4xl font-extrabold text-center mt-10 mb-4">
						පාඨමාලාවෙන් පසු ඔබට
					</h1>
					<div className="w-[90%] lg:w-[50%]">
						<ul>
							<li className="flex text-[15px] lg:text-[20px] items-center mb-2">
								✅Artificial Intelligence හා සම්බන්ධ theories පිළිබඳව සම්පූර්ණ
								අදහසක් ලබා ගත හැකි වීම.
							</li>
							<li className="flex text-[15px] lg:text-[20px] items-center mb-2">
								✅Industial standards වලට අනුකූලව Machine Learning project එකක්
								මුල සිට සරලව නිර්මාණය කිරීමට හැකි වීම.
							</li>
							<li className="flex text-[15px] lg:text-[20px] items-center mb-2">
								✅Deep learning වැනි advanced machine learning techniques
								පිළිබඳව සම්පූර්ණ අදහසක් ලබා ගත හැකි වීම.
							</li>
							<li className="flex text-[15px] lg:text-[20px] items-center mb-2">
								✅නවතම Generative AI tools කාර්යක්ෂමව භාවිතා කිරීමට අවශ්‍ය මග
								පෙන්වීම සහ උපදෙස් ලබා දීම.
							</li>
							<li className="flex text-[15px] lg:text-[20px] items-center mb-2">
								✅සෑම session එකක් අවසානයේදීම Class recordings ලබා දීම සහ ඇතිවන
								ගැටලු නිරාකරණය කර ගැනීමට අවශ්‍ය උදව් සහ මගපෙන්වීම ලැබීම.
							</li>
							<li className="flex text-[15px] lg:text-[20px] items-center mb-2">
								✅වටිනා සහතික පතක් හිමිවීම
							</li>
							<li className="flex text-[15px] lg:text-[20px] items-center mb-2">
								✅පාඨමාලාවේදී කෙරෙන project සම්පූර්ණ කරන සිසුන් සදහා අමතර විශේෂ
								සහතික පතක් හිමි වීම
							</li>
							<li className="flex-wrap flex text-[15px] lg:text-[20px] mb-2">
								<p>
									✅පාඨමාලාව අවසානයේ කෙරෙන ඇගයීමෙන් ප්‍රථම ස්ථාන ලබා ගන්නා
									සිසුන් තිදෙනා සදහා සම්පූර්ණ පාඨමාලාවම{" "}
									<span className="text-red-700 font-extrabold">නොමිලේ</span>{" "}
									වීම
								</p>
							</li>
						</ul>
					</div>
					<button
						className="w-[150px] reg-button h-[50px] mt-4  bg-[#0f121f] hover:bg-black text-white rounded-md my-2 mx-auto"
						onClick={() => {
							setIsModelOpened(true);
						}}
					>
						ලියාපදිංචි වන්න!
					</button>
				</div>

				<div className="flex flex-col justify-center items-center w-full max-w-[1160px] mx-auto">
					<div className="w-full flex justify-center items-center mt-5 h-[80px]">
						<div className="text-2xl lg:text-4xl flex flex-wrap  font-extrabold text-center mt-8 mb-6 justify-center items-baseline">
							<h1>පාඨමාලාවේ අන්තර්ගතය :</h1>
							<h1>Course content</h1>
							<a
								href="/Content.pdf"
								download
								className="ml-2 inline-flex items-center bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition ease-in-out duration-300 p-2"
							>
								<Download className="w-3 h-3 sm:w-5 sm:h-5" />
							</a>
						</div>
					</div>
					<div className="w-[90%] lg:w-[50%]">
						<Accordion type="single" collapsible>
							<AccordionItem value="item-1">
								<AccordionTrigger className="max-h-[20px]  text-[18px]">
									Orientation Program.
								</AccordionTrigger>
								<AccordionContent>
									<ul>
										<li className="flex text-[15px] items-center">
											<TbPointFilled size={15} />
											Welcome & Course Overview.
										</li>
										<li className="flex text-[15px] items-center">
											<TbPointFilled size={15} />
											Python Fundamentals.
										</li>
										<li className="flex text-[15px] items-center">
											<TbPointFilled size={15} />
											Environment Setup.
										</li>
										<li className="flex text-[15px] items-center">
											<TbPointFilled size={15} />
											What is AI & Machine Learning?
										</li>
										<li className="flex text-[15px] items-center">
											<TbPointFilled size={15} />
											Our First Sample Project.
										</li>
										<li className="flex text-[15px] items-center">
											<TbPointFilled size={15} />
											Using AI Tools for Help.
										</li>
										<li className="flex text-[15px] items-center">
											<TbPointFilled size={15} />
											Q&A and Next Steps.
										</li>
									</ul>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-2">
								<AccordionTrigger className="max-h-[20px] text-[18px]">
									Prompts and Prompt Engineering.
								</AccordionTrigger>
								<AccordionContent>
									<ul>
										<li className="flex text-[15px] items-center">
											<TbPointFilled size={15} />
											What is prompt engineering ?
										</li>
										<li className="flex text-[15px] items-center">
											<TbPointFilled size={15} />
											Elements of a prompts.
										</li>
										<li className="flex text-[15px] items-center">
											<TbPointFilled size={15} />
											Types of prompts.
										</li>
										<li className="flex text-[15px] items-center">
											<TbPointFilled size={15} />
											Examples of using ChatGPT using quality Prompts.
										</li>
									</ul>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-3">
								<AccordionTrigger className="max-h-[20px] text-[18px]">
									AI tools for learning IT.
								</AccordionTrigger>
								<AccordionContent>
									<ul>
										<li className="flex text-[15px] items-center">
											<TbPointFilled size={15} />
											Chat GPT.
										</li>
										<li className="flex text-[15px] items-center">
											<TbPointFilled size={15} />
											Google AI Tools.
										</li>
										<li className="flex text-[15px] items-center">
											<TbPointFilled size={15} />
											AI for Coding.
										</li>
										<li className="flex text-[15px] items-center">
											<TbPointFilled size={15} />
											Colab for AI.
										</li>
										<li className="flex text-[15px] items-center">
											<TbPointFilled size={15} />
											Other tools.
										</li>
									</ul>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-4">
								<AccordionTrigger className="max-h-[20px] text-[18px]">
									Introduction to AI & Machine Learning.
								</AccordionTrigger>
								<AccordionContent>
									<ul>
										<li className="flex text-[15px] items-center">
											<TbPointFilled size={15} />
											What is AI ML ?
										</li>
										<li className="flex text-[15px] items-center">
											<TbPointFilled size={15} />
											Types of Machine Learning.
										</li>
										<li className="flex text-[15px] items-center">
											<TbPointFilled size={15} />
											How machine learning works.
										</li>
										<li className="flex text-[15px] items-center">
											<TbPointFilled size={15} />
											Examples for Machine Learning using real world scenarios.
										</li>
										<li className="flex text-[15px] items-center">
											<TbPointFilled size={15} />
											Simple Machine Project.
										</li>
									</ul>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-5">
								<AccordionTrigger className="max-h-[20px] text-[18px]">
									Linear and Logistic Regression.
								</AccordionTrigger>
								<AccordionContent>
									<ul>
										<li className="flex text-[15px] items-center">
											<TbPointFilled size={15} />
											Regression.
										</li>
										<li className="flex text-[15px] items-center">
											<TbPointFilled size={15} />
											Prediction.
										</li>
										<li className="flex text-[15px] items-center">
											<TbPointFilled size={15} />
											Classification (Binary and multi).
										</li>
										<li className="flex text-[15px] items-center">
											<TbPointFilled size={15} />2 Sample Projects.
										</li>
									</ul>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-6">
								<AccordionTrigger className="max-h-[20px] text-[18px]">
									Supervised Machine Learning.
								</AccordionTrigger>
								<AccordionContent>
									<ul>
										<li className="flex text-[15px] items-center">
											<TbPointFilled size={15} />
											Data pre-processing.
										</li>
										<li className="flex text-[15px] items-center">
											<TbPointFilled size={15} />
											Cost function.
										</li>
										<li className="flex text-[15px] items-center">
											<TbPointFilled size={15} />
											Overfitting , underfitting.
										</li>
										<li className="flex text-[15px] items-center">
											<TbPointFilled size={15} />
											Evaluations.
										</li>
										<li className="flex text-[15px] items-center">
											<TbPointFilled size={15} />
											Decision Tree.
										</li>
										<li className="flex text-[15px] items-center">
											<TbPointFilled size={15} />
											Random Forest.
										</li>
										<li className="flex text-[15px] items-center">
											<TbPointFilled size={15} />
											Two sample projects using Decision Tree and random forest.
										</li>
									</ul>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-7">
								<AccordionTrigger className="max-h-[20px] text-[18px]">
									Unsupervised Machine Learning.
								</AccordionTrigger>
								<AccordionContent>
									<ul>
										<li className="flex text-[15px] items-center">
											<TbPointFilled size={15} />
											What is Unsupervised Machine Learning ?
										</li>
										<li className="flex text-[15px] items-center">
											<TbPointFilled size={15} />
											Clustering Algorithms.
										</li>
										<li className="flex text-[15px] items-center">
											<TbPointFilled size={15} />
											Dimensional Reduction.
										</li>
										<li className="flex text-[15px] items-center">
											<TbPointFilled size={15} />
											Sample Project.
										</li>
									</ul>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-8">
								<AccordionTrigger className="max-h-[20px] text-[18px]">
									Reinforcement Learning.
								</AccordionTrigger>
								<AccordionContent>
									<ul>
										<li className="flex text-[15px] items-center">
											<TbPointFilled size={15} />
											What is Reinforcement Learning?
										</li>
										<li className="flex text-[15px] items-center">
											<TbPointFilled size={15} />
											How they work.
										</li>
										<li className="flex text-[15px] items-center">
											<TbPointFilled size={15} />
											Real world example.
										</li>
										<li className="flex text-[15px] items-center">
											<TbPointFilled size={15} />
											One sample project.
										</li>
									</ul>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-9">
								<AccordionTrigger className="max-h-[20px] text-[18px]">
									Deep Learning.
								</AccordionTrigger>
								<AccordionContent>
									<ul>
										<li className="flex text-[15px] items-center">
											<TbPointFilled size={15} />
											What is Deep Learning?
										</li>
										<li className="flex text-[15px] items-center">
											<TbPointFilled size={15} />
											How the Artificial Neural Network works.
										</li>
										<li className="flex text-[15px] items-center">
											<TbPointFilled size={15} />
											Deep Learning Algorithms (CNN / LSTM).
										</li>
										<li className="flex text-[15px] items-center">
											<TbPointFilled size={15} />
											Two sample Projects (Prediction / Classification).
										</li>
									</ul>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-10">
								<AccordionTrigger className="max-h-[20px] text-[18px]">
									Generative AI.
								</AccordionTrigger>
								<AccordionContent>
									<ul>
										<li className="flex text-[15px] items-center">
											<TbPointFilled size={15} />
											What is Generative AI?
										</li>
										<li className="flex text-[15px] items-center">
											<TbPointFilled size={15} />
											Examples and Tools for Generative AI.
										</li>
										<li className="flex text-[15px] items-center">
											<TbPointFilled size={15} />
											How to use API keys and generate things.
										</li>
										<li className="flex text-[15px] items-center">
											<TbPointFilled size={15} />
											Sample project (Chat Bot).
										</li>
									</ul>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-11">
								<AccordionTrigger className="max-h-[20px] text-[18px]">
									AI/ML for Real-World Scenarios.
								</AccordionTrigger>
								<AccordionContent>
									<ul>
										<li className="flex text-[15px] items-center">
											<TbPointFilled size={15} />
											This is project Based session.
										</li>
										<li className="flex text-[15px] items-center">
											<TbPointFilled size={15} />
											End to end Machine learning models.
										</li>
										<li className="flex text-[15px] items-center">
											<TbPointFilled size={15} />
											Create backend using the Flask.
										</li>
										<li className="flex text-[15px] items-center">
											<TbPointFilled size={15} />
											Create new Web app for classification problem.
										</li>
									</ul>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</div>
					<button
						className="w-[150px] reg-button h-[50px] mt-4  bg-[#0f121f] hover:bg-black text-white rounded-md my-2 mx-auto"
						onClick={() => {
							setIsModelOpened(true);
						}}
					>
						ලියාපදිංචි වන්න!
					</button>
				</div>
			</div>

			<div className="w-full flex justify-center items-center mt-5 h-[80px] bg-[#0f121f]">
				<p className="text-sm lg:text-base text-center text-white">
					© 2024 by SKYREK (Pvt) Ltd. All Rights Reserved.
					<a
						href="/privacy"
						className="text-white underline ml-2 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
					>
						Privacy Policy
					</a>
				</p>
			</div>
		</>
	);
}
