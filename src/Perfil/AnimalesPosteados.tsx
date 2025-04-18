interface Post {
  id: number;
  nameAnimal: string;
  typeAnimal: string;
  description: string;
  image: File;
}
interface AnimalesPosteadosProps {
  posts: Post[];
}
export default function AnimalesPosteados({ posts }: AnimalesPosteadosProps) {
  return (
    <section>
      <h1 className="text-xl font-semibold my-2">
        Tus ultimos animales en adopcion
      </h1>
      {posts.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 grid-rows-2 ">
          {posts.slice(0, 4).map((post, index) => (
            <div
              className="border-pink-400 border-4 rounded-lg text-center"
              key={index}
            >
              <img src="../images/animales.jpg"></img>
              <p className="font-semibold p-3">{post.nameAnimal}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No tienes animales en adopcion</p>
      )}
    </section>
  );
}
