import HomeHeader from "../components/layout/homeHeader";
import Footer from "../components/layout/homeFooter";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-cream text-primary">
      <HomeHeader />
      <main className="flex-1 p-6">
        <div className="flex-1 p-10 g-[url('/path/to/image.jpg')] bg-cover bg-center">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className=" text-3xl font-bold mb-10">Welcome to MySchool Enrollment Management System</h2>
          <p className="text-lg leading-relaxed mb-6">
            Our system is designed to streamline the enrollment process for both students and administrators
            of <strong>MySchool University</strong>. Easily manage applications, subjects, grades, and more
            through a simple and user-friendly interface.
          </p>
          </div>
          <p className="text-md p-20">
            Whether you're an aspiring student or a school administrator, our platform ensures an efficient,
            transparent, and secure experience in handling academic records and enrollment procedures.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
