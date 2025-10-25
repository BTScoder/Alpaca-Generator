import { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import { Heart } from "lucide-react";
function App() {
  const [alpaca, setAlpaca] = useState();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [chosenCategory, setChosenCategory] = useState("hair");
  const alpacaRef = useRef(null); // Reference to just the alpaca image area
  const [alpacaDrawing, setAlpacaDrawing] = useState({
    hair: "/alpaca/hair/default.png",
    ears: "/alpaca/ears/default.png",
    eyes: "/alpaca/eyes/default.png",
    mouth: "/alpaca/mouth/default.png",
    neck: "/alpaca/neck/default.png",
    leg: "/alpaca/leg/default.png",
    accessories: null,
    background: "/alpaca/backgrounds/darkblue70.png",
    nose: "/alpaca/nose.png",
  });

  const changeAlpacaPart = (part, item) => {
    // If the category is "backgrounds", update "background" in state
    const statePart = part === "backgrounds" ? "background" : part;
    setAlpacaDrawing((prev) => ({ ...prev, [statePart]: item.path }));
  };
  useEffect(() => {
    fetch("data/data.json")
      .then((response) => response.json())
      .then((data) => {
        setAlpaca(data);
        const keys = Object.keys(data);
        setCategories(keys);
        setLoading(false);
      });
  }, []);

  const randomAlpaca = () => {
    if (!alpaca) return;

    const randomEars = Math.floor(Math.random() * alpaca.ears.length);
    const randomHair = Math.floor(Math.random() * alpaca.hair.length);
    const randomEyes = Math.floor(Math.random() * alpaca.eyes.length);
    const randomMouth = Math.floor(Math.random() * alpaca.mouth.length);
    const randomNeck = Math.floor(Math.random() * alpaca.neck.length);
    const randomLeg = Math.floor(Math.random() * alpaca.leg.length);
    const randomAccessories = Math.floor(
      Math.random() * alpaca.accessories.length
    );
    const randomBackground = Math.floor(
      Math.random() * alpaca.backgrounds.length
    );

    setAlpacaDrawing({
      hair: alpaca.hair[randomHair].path,
      ears: alpaca.ears[randomEars].path,
      eyes: alpaca.eyes[randomEyes].path,
      mouth: alpaca.mouth[randomMouth].path,
      neck: alpaca.neck[randomNeck].path,
      leg: alpaca.leg[randomLeg].path,
      accessories: alpaca.accessories[randomAccessories].path,
      background: alpaca.backgrounds[randomBackground].path,
      nose: "/alpaca/nose.png",
    });
  };
  // console.log(alpaca, categories);
  const handleDownload = async () => {
    if (!alpacaRef.current) return;

    try {
      const canvas = await html2canvas(alpacaRef.current, {
        backgroundColor: null, // Makes background transparent if needed
        scale: 2, // Higher quality image (2x resolution)
        useCORS: true, // Allows cross-origin images to be loaded
      });

      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "my_alpaca.png";
      link.click();
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return (
    <>
      <div className="p-4 w-screen bg-gray-200 h-screen">
        <h1 className="text-5xl mb-10 font-heading tracking-widest text-blue-950 max-w-[1200px] mx-auto">
          ALPACA GENERATOR
        </h1>
        <div className="lg:grid lg:grid-cols-2 lg:gap-10 lg:max-w-[1000px] mx-auto bg-white py-20 px-10 rounded-2xl">
          <div>
            {/* Alpaca Image Div - THIS is what gets downloaded */}
            <div
              ref={alpacaRef} // Move ref here to only capture the alpaca
              className="h-60 sm:h-96 w-full max-w-md mx-auto rounded-xl relative overflow-hidden"
              style={{ backgroundImage: `url('${alpacaDrawing.background}')` }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                {/* This is the box for the actual alpaca */}
                <div className="relative w-60 h-60 sm:h-96 sm:w-96">
                  {/* Accessories */}
                  {alpacaDrawing.accessories && (
                    <div className="absolute z-70 inset-0">
                      <img
                        src={alpacaDrawing.accessories}
                        alt="accessories"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}

                  {/*Ears  */}
                  <div className="absolute inset-0">
                    <img
                      src={alpacaDrawing.ears}
                      alt="ears"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  {/* Hair */}
                  <div className="absolute inset-0 z-50">
                    <img
                      src={alpacaDrawing.hair}
                      alt="hair"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  {/* Eyes */}
                  <div className="absolute inset-0 z-50">
                    <img
                      src={alpacaDrawing.eyes}
                      alt="eyes"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  {/* Mouth */}
                  <div className="absolute inset-0 z-50">
                    <img
                      src={alpacaDrawing.mouth}
                      alt="mouth"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  {/* Nose */}
                  <div className="absolute inset-0 z-40">
                    <img
                      src={alpacaDrawing.nose}
                      alt="nose"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  {/* Neck */}
                  <div className="absolute inset-0 z-0">
                    <img
                      src={alpacaDrawing.neck}
                      alt="neck"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  {/* Legs */}
                  <div className="absolute left-10 bottom-0  z-0">
                    <img
                      src={alpacaDrawing.leg}
                      alt="legs"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons stay outside the download area */}
            <div className="mt-5 flex items-center justify-center gap-6">
              <button
                className="transition duration-150 rounded-full hover:shadow-2xl hover:scale-105 hover:bg-blue-950 hover:text-white px-6 py-3 bg-white border cursor-pointer border-blue-950 flex items-center gap-2"
                onClick={() => randomAlpaca()}
              >
                <Heart className="w-6 h-6 text-gray-500 " />
                Random
              </button>
              <button
                className="transition duration-150 rounded-full hover:shadow-2xl hover:scale-105 hover:bg-blue-950 hover:text-white px-6 py-3 bg-white border cursor-pointer border-blue-950 flex items-center gap-2"
                onClick={handleDownload}
              >
                <Heart className="w-6 h-6 text-gray-500 " />
                Download
              </button>
            </div>
          </div>
          {/* Options Div */}
          <div>
            <div>
              <p className="text-4xl px-3 py-5 font-bold text-blue-950">
                Accesorize the Alpaca
              </p>
              <div className="w-80% mx-auto flex justify-start items-center gap-4 flex-wrap max-w-md">
                {categories.map((category) => (
                  <p
                    key={category}
                    className="cursor-pointer p-2 border w-40% border-blue-950 transition duration-150 rounded-2xl hover:shadow-2xl hover:scale-105 hover:bg-blue-950 hover:text-white "
                    onClick={() => setChosenCategory(category)}
                  >
                    {category}
                  </p>
                ))}
              </div>
            </div>
            <div>
              <p className="text-4xl px-3 py-5 font-bold text-blue-950">
                Style
              </p>
              <div className="w-80% mx-auto flex justify-start items-center gap-4 flex-wrap max-w-md">
                {alpaca &&
                  alpaca[chosenCategory]?.map((item) => (
                    <p
                      key={item.name}
                      className="transition duration-150 rounded-2xl hover:shadow-2xl hover:scale-105 hover:bg-blue-950 hover:text-white  p-2 border w-40% border-blue-950 cursor-pointer"
                      onClick={() => changeAlpacaPart(chosenCategory, item)}
                    >
                      {item.name}
                    </p>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
