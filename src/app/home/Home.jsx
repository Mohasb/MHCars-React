import { SearchCar } from "../../components/searchCar/SearchCar";
import "./Home.scss";

export default function Home() {
  return (
    <main>
      <div id="parallax-world-of-ugg">
        <section>
          <div className="parallax-one">
            <h2>Alquiler de coches</h2>
            <SearchCar />
          </div>
        </section>
        <section>
          <div className="block">
              <p className="line-break"></p>
            <p>
              <span className="first-character sc">I</span>Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Facilis, illum provident? Rerum
              eveniet corporis, distinctio cumque reiciendis voluptatum
              explicabo expedita facilis maxime sunt aut? Cupiditate, harum. Aut
              hic laborum dolore unde distinctio cum laboriosam quisquam
              adipisci nostrum reprehenderit neque repellat error tempore
              accusantium aliquid fugiat harum deserunt recusandae officia
            </p>
              <p className="line-break"></p>
          </div>
        </section>

        <section>
          <div className="parallax-two">
            <h2>Benidorm</h2>
          </div>
        </section>

        <section>
          <div className="block">
              <p className="line-break"></p>
            <p>
              <span className="first-character ny">B</span>Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Facilis, illum provident? Rerum
              eveniet corporis, distinctio cumque reiciendis voluptatum
              explicabo expedita facilis maxime sunt aut? Cupiditate, harum. Aut
              hic laborum dolore unde distinctio cum laboriosam quisquam
            </p>
              <p className="line-break "></p>
          </div>
        </section>

        <section>
          <div className="parallax-three">
            <h2 style={{padding:"1rem 0 2rem 0"}}>Nuestros Coches</h2>
            <div className="car-images slideshow">
            <img className="slideshow-image" src="/src/assets/Cars/AudiA1Image.webp" alt="AudiA1Image" />
            <img className="slideshow-image" src="/src/assets/Cars/AudiA3Image.webp" alt="AudiA3Image" />
            <img className="slideshow-image" src="/src/assets/Cars/MercedesClaseAImage.webp" alt="MercedesClaseAImage" />
            <img className="slideshow-image" src="/src/assets/Cars/AudiA4Image.webp" alt="AudiA4Image" />
            <img className="slideshow-image" src="/src/assets/Cars/AudiQ2Image.webp" alt="AudiQ2Image" />
            <img className="slideshow-image" src="/src/assets/Cars/Fiat500Cabrio.webp" alt="Fiat500Cabrio" />
            <img className="slideshow-image" src="/src/assets/Cars/FordFocusImage.webp" alt="FordFocusImage" />
            <img className="slideshow-image" src="/src/assets/Cars/VolkswagenTROCCabrioletImage.webp" alt="VolkswagenTROCCabrioletImage" />
            <img className="slideshow-image" src="/src/assets/Cars/VolkswagenTouranImage.webp" alt="VolkswagenTouranImage" />
            <img className="slideshow-image" src="/src/assets/Cars/SkodaKaroqoImage.webp" alt="SkodaKaroqoImage" />
            <img className="slideshow-image" src="/src/assets/Cars/PeugeotSpaceImage.webp" alt="PeugeotSpaceImage" />
            <img className="slideshow-image" src="/src/assets/Cars/Peugeot5008Image.webp" alt="Peugeot5008Image" />
            <img className="slideshow-image" src="/src/assets/Cars/OpelMokkaImage.webp" alt="OpelMokkaImage" />
            <img className="slideshow-image" src="/src/assets/Cars/FordTransitXlImage.webp" alt="FordTransitXlImage" />

            </div>
          </div>
        </section>

        <section>
          <div className="block">
              <p className="line-break margin-top-10"></p>
            <p>
              <span className="first-character atw">W</span>Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Facilis, illum provident?
              Rerum eveniet corporis, distinctio cumque reiciendis voluptatum
              explicabo expedita facilis maxime sunt aut? Cupiditate, harum. Aut
              hic laborum dolore unde distinctio cum laboriosam quisquam
              adipisci nostrum reprehenderit neque repellat error tempore
              accusantium aliquid fugiat harum deserunt recusandae officia,
              provident ut quod quidem nisi corporis. Eius voluptates illum
              nostrum magni tenetur mollitia, dolores excepturi unde quo
              molestias possimus eum. Ducimus velit earum minus quibusdam iusto
              obcaecati aspernatur id excepturi. Doloribus optio recusandae
              praesentium, accusamus ullam commodi vitae nemo tempora adipisci
              facere cupiditate, neque quam molestiae. Eius quas tempore
              explicabo reprehenderit?
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
