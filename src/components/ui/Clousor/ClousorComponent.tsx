import { Star } from 'lucide-react';
import { LoadingCarousel } from './loading-carousel';

const ClousorComponent = () => {
  return (
    <>
      <div className="flex justify-center align-middle ">
        <div className="max-w-7xl  grid grid-flow-col-dense ">
          <LoadingCarousel className="" />
          <div className="lg:flex hidden">
            <div className="bg-[url('https://img.lazcdn.com/g/tps/imgextra/i2/O1CN01tceZus1IewufOY1tZ_!!6000000000919-2-tps-364-316.png')] bg-cover bg-center h-50 ">
              <Star className="m-1.5" />
              <span>4.8 Rated</span>
              <p className="text-center">Download the App now </p>
              <div className="flex justify-center items-center gap-4 m-2">
                <img
                  src="https://img.lazcdn.com/g/tps/imgextra/i2/O1CN01n3PMa828kJZVuCbPp_!!6000000007970-2-tps-72-72.png_150x150q80.png"
                  alt="shpping pic"
                  className="w-11"
                />
                <p className="w-23"> Free shipping</p>
              </div>
              <div className="flex justify-center items-center gap-4 m-2">
                <img
                  src="https://img.lazcdn.com/g/tps/imgextra/i3/O1CN01J03SMW1lebTE7xkaN_!!6000000004844-2-tps-72-72.png_150x150q80.png"
                  alt="shpping pic"
                  className="w-11"
                />
                <p className="w-23"> Exclusive Vouchers</p>
              </div>

              <div className="flex items-center">
                <img
                  src="https://img.drz.lazcdn.com/g/tps/imgextra/i2/O1CN01jHjmpl1pxcRVgFrYS_!!6000000005427-0-tps-150-150.jpg_360x360q80.jpg"
                  alt="qr-code"
                  className="w-25 mt-10"
                />
                <div className="p-5 flex flex-col flex-justify-between mt-5 gap-3">
                  <img
                    src="	https://img.lazcdn.com/g/tps/imgextra/i1/O1CN01QJGFfc1S0mKngu4rQ_!!6000000002185-2-tps-125-36.png"
                    alt=""
                    className="w-25"
                  />
                  <img
                    src="	https://img.lazcdn.com/g/tps/imgextra/i4/O1CN01uAl8kB1wEv2DNjdhB_!!6000000006277-2-tps-125-36.png"
                    alt=""
                    className="w-25"
                  />
                </div>
              </div>
              <div>
                <p>Dowload The App Now!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClousorComponent;
