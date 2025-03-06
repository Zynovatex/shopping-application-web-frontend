
import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col">
           
            {/* Main Content */}
            <main className="flex-grow px-6 md:px-20 lg:px-32">

              {/* About Section */}
<section className="mt-10 flex flex-col lg:flex-row items-center gap-10">
    {/* Left: Text Content */}
    <div className="w-full lg:w-1/2">
        <h1 className="text-4xl font-bold text-black">Srilank's First VirtualCity Platform</h1>
        <p className="text-gray-600 mt-4 text-justify">
        VirtualCity is a next-generation digital marketplace designed to seamlessly connect businesses and consumers in Sri Lanka. Our platform offers a fully interactive virtual experience, enabling users to discover top-rated businesses, explore digital storefronts, and engage in secure transactions—all in one place.
        With a focus on innovation, accessibility, and user convenience, VirtualCity empowers businesses to expand their online presence while providing consumers with a smooth and hassle-free shopping experience. Whether you're a seller looking to showcase your products or a buyer searching for trusted services, VirtualCity ensures a smart, efficient, and engaging virtual ecosystem.
        Join us in shaping the future of Sri Lanka’s digital commerce and online business landscape.
        </p>
    </div>

    {/* Right: Image */}
    <div className="w-full lg:w-1/2 flex justify-end">
        <Image 
            src="/team.jpg" 
            alt="Teamwork" 
            width={500} 
            height={300} 
            className="rounded-lg shadow-lg w-full max-w-lg"
        />
    </div>
</section>
{/* Team Section */}
<section className="mt-16 py-15">
    <h2 className="text-4xl font-bold text-center mb-10">Our Team Members</h2>

    {/* First Row: 3 Members */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
            { name: "Nimesh Madhushan", image: "/member1.jpeg" },
            { name: "Kasun Sakthi", image: "/member1.jpeg" },
            { name: "Sanduni Hewagama", image: "/member1.jpeg" },
        ].map((member, index) => (
            <div 
                key={index} 
                className="bg-white shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
                {/* Member Image */}
                <div className="w-full h-60">
                    <Image 
                        src={member.image} 
                        alt={member.name} 
                        width={300} 
                        height={300} 
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Member Info */}
                <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
                    <p className="text-indigo-600 font-medium">Fullstack Developer</p>
                    <p className="text-gray-600 text-sm mt-2">
                         Driven by innovation, we craft cutting-edge digital solutions for a smarter future.
                    </p>
                </div>
            </div>
        ))}
    </div>

{/* Second Row: 2 Members (Centered with Smaller Images) */}
{/* Second Row: 2 Members (Larger Images, Centered) */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mt-8 justify-center place-items-center">
    {[
        { name: "Lingaraj", image: "/member1.jpeg" },
        { name: "Sashini Himaya", image: "/member1.jpeg" },
    ].map((member, index) => (
        <div 
            key={index} 
            className="bg-white shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 w-96"
        >
            {/* Increased Member Image Size */}
            <div className="w-full h-72">  {/* Increased height */}
                <Image 
                    src={member.image} 
                    alt={member.name} 
                    width={350}  
                    height={350}  
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Member Info */}
            <div className="p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
                <p className="text-indigo-600 font-medium">Fullstack Developer</p>
                <p className="text-gray-600 text-sm mt-2">
                     Driven by innovation, we craft cutting-edge digital solutions for a smarter future.
                </p>
            </div>
        </div>
    ))}
</div>
</section>

{/* Vision & Mission Section */}
<section className="mt-16 py-5">
    <h2 className="text-3xl font-bold text-center mb-10">Our Vision & Mission</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Vision Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 text-center transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Our Vision</h3>
            <p className="text-gray-600">
                To create Sri Lanka’s leading virtual platform, empowering businesses and consumers 
                with seamless, innovative, and secure digital solutions.
            </p>
        </div>

        {/* Mission Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 text-center transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Our Mission</h3>
            <p className="text-gray-600">
                To revolutionize online interactions by providing a user-friendly, scalable, 
                and technology-driven virtual ecosystem that fosters growth and connectivity.
            </p>
        </div>
    </div>
</section>

<section className="mt-16 py-10">
    <h2 className="text-3xl font-bold text-center">Why Choose VirtualCity?</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 py-8">
        {[
            { title: "Seamless Experience", description: "A user-friendly interface that makes navigation effortless." },
            { title: "Secure & Reliable", description: "We ensure data protection and secure transactions." },
            { title: "Business Growth", description: "Helping businesses expand their reach in the virtual space." },
            { title: "24/7 Support", description: "Our dedicated team is here to assist you at any time." },
            { title: "Innovative Technology", description: "We integrate cutting-edge solutions to enhance engagement." },
            { title: "Scalability", description: "A platform that grows with your business needs." },
        ].map((feature, index) => (
            <div key={index} className="bg-white shadow-lg p-6 rounded-lg text-center">
                <h3 className="text-lg font-semibold text-indigo-600">{feature.title}</h3>
                <p className="text-gray-600 mt-2 ">{feature.description}</p>
            </div>
        ))}
    </div>
</section>


            </main>

        </div>
    );
}
