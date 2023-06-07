export default function BackGround(props) {
  return (
    <>
      {props.children}
      <div className="bg">
        <section className="fixed-background img-1">
          <div className="content"></div>
        </section>
        <section className="fixed-background img-2">
          <div className="content"></div>
        </section>
        <section className="fixed-background img-3">
          <div className="content"></div>
        </section>
        <section className="fixed-background img-4">
          <div className="content"></div>
        </section>
      </div>
    </>
  );
}
