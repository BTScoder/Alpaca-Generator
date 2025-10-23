import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
function App() {
  const [alpaca, setAlpaca] = useState();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [chosenCategory, setChosenCategory] = useState("hair");
  const [alpacaDrawing, setAlpacaDrawing] = useState({
    hair: "src/assets/alpaca/hair/default.png",
    ears: "src/assets/alpaca/ears/default.png",
    eyes: "src/assets/alpaca/eyes/default.png",
    mouth: "src/assets/alpaca/mouth/default.png",
    neck: "src/assets/alpaca/neck/default.png",
    accessories: null,
    background: "src/assets/alpaca/backgrounds/darkblue70.png",
    nose: "src/assets/alpaca/nose.png",
  });

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

  const changeAlpacaPart = (part, item) => {
    setAlpacaDrawing((prev) => ({ ...prev, [part]: item.path }));
    // console.log(part, item.path, alpacaDrawing);
  };

  const randomAlpaca = () => {
    if (!alpaca) return;

    const randomEars = Math.floor(Math.random() * alpaca.ears.length);
    const randomHair = Math.floor(Math.random() * alpaca.hair.length);
    const randomEyes = Math.floor(Math.random() * alpaca.eyes.length);
    const randomMouth = Math.floor(Math.random() * alpaca.mouth.length);
    const randomNeck = Math.floor(Math.random() * alpaca.neck.length);
    const randomAccessories = Math.floor(
      Math.random() * alpaca?.accessories.length
    );
    const randomBackground = Math.floor(
      Math.random() * alpaca?.backgrounds.length
    );

    setAlpacaDrawing({
      hair: alpaca.hair[randomHair].path,
      ears: alpaca.ears[randomEars].path,
      eyes: alpaca.eyes[randomEyes].path,
      mouth: alpaca.mouth[randomMouth].path,
      neck: alpaca.neck[randomNeck].path,
      accessories: alpaca.accessories[randomAccessories].path,
      background: alpaca.backgrounds[randomBackground].path,
      nose: "src/assets/alpaca/nose.png",
    });
  };
  // console.log(alpaca, categories);
  return (
    <>
      <div className="p-4 w-screen bg-gray-200 h-screen">
        <h1 className="text-5xl mb-10 font-heading tracking-widest text-blue-950 max-w-[1200px] mx-auto">
          ALPACA GENERATOR
        </h1>
        <div className="lg:grid lg:grid-cols-2 lg:gap-10 lg:max-w-[1000px] mx-auto bg-white py-20 px-10 rounded-2xl">
          <div>
            {/* Alpaca Image Div */}
            <div
              className="bg-[url('${alpacaDrawing.background}')] h-60 mx-auto w-full rounded-xl"
              style={{ backgroundImage: `url('${alpacaDrawing.background}')` }}
            >
              <div className="max-w-lg mx-auto relative">
                {/* Accessories */}
                {alpacaDrawing.accessories && (
                  <div className="absolute z-70 top-2 left-30 size-60 overflow-hidden">
                    <img
                      src={alpacaDrawing.accessories}
                      alt="accessories"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/*Ears  */}
                <div className="absolute left-30 size-60 ">
                  <img
                    src={alpacaDrawing.ears}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Hair */}
                <div className="size-60 absolute z-50 left-25 top-2">
                  <img
                    src={alpacaDrawing.hair}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Eyes */}
                <div className="size-60 z-50 absolute top-0 left-30">
                  <img
                    src={alpacaDrawing.eyes}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Mouth and Nose*/}
                <div className="absolute left-30 -top-2 z-50 size-60">
                  <img src={alpacaDrawing.mouth} alt="" className="" />
                </div>
                <div className="absolute top-0 left-32 z-40 size-60">
                  <img src={alpacaDrawing.nose} alt="nose" className="" />
                </div>
                {/* Neck */}
                <div className="size-60 absolute z-0 top-2 left-32">
                  <img src={alpacaDrawing.neck} alt="" className="neck" />
                </div>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-6">
              <button
                className="transition duration-150 rounded-2xl hover:shadow-2xl hover:scale-105 hover:bg-blue-950 hover:text-white px-4 py-3 border cursor-pointer border-blue-950 flex items-center gap-2"
                onClick={() => randomAlpaca()}
              >
                <Heart className="w-6 h-6 text-gray-500 " />
                Random
              </button>
              {/* <button className="rounded-2xl px-4 py-3 border border-blue-950">
            Download
          </button> */}
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
