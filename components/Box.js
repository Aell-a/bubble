import Image from "next/image";

export default function Box(props) {
  return (
    <div className="w-72 h-120 border-4 bg-indigo-400 border-gray-800 rounded-md mx-auto my-auto text-center">
      <a href={props.url}>
        <Image
          alt="box-image"
          className="border-b-2 border-gray-800"
          src={`/${props.image}.png`}
          width={440}
          height={220}
        />
      </a>
      <div>
        <h3 className="border-b-2 border-gray-800 text-white bg-indigo-800 text-lg font-bold">
          {props.title}
        </h3>
        <p className="text-gray-200 font-medium p-5">{props.content}</p>
      </div>
    </div>
  );
}
