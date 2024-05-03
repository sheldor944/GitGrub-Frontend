const Footer = () => {
  return (
    <div className="bg-dark_color py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex gap-3">
          <img src={"/logo.png"} className="max-h-20 max-w-auto relative justify-content " ></img>
          <span
            className="text-3xl text-white font-bold tracking-tight"
            style={{ marginTop: '20px', marginLeft: '10px' }}
          >
            GitGrub
          </span>

        </div>
        <span className="text-white font-bold tracking-tight flex gap-4">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </span>
      </div>
    </div>
  );
};

export default Footer;