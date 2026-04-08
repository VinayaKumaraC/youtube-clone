export default function VideoCard({ video }) {
  return (
    <div className="cursor-pointer">
      <img
        src={video.thumbnail}
        className="rounded-lg w-full h-40 object-cover"
      />

      <div className="mt-2">
        <h3 className="font-semibold">{video.title}</h3>
        <p className="text-gray-400 text-sm">{video.channel}</p>
      </div>
    </div>
  );
}