export default function Separator() {
  return (
    <section className="grid laptop:grid-cols-2 h-0 micro:h-[50px] laptop:h-[100px] container">
      <div></div>
      <div className="bg-wine rounded-b-full w-full h-[150px] micro:h-[200px] mobile:h-[300px] tablet:max-w-[560px] mx-auto laptop:h-[400px]"></div>
    </section>
  );
}
