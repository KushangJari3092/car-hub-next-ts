/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
import CarCard from "@/components/car/CarCard";
import CustomFilter from "@/components/common/CustomFilter";
import SearchBar from "@/components/common/SearchBar";
import ShowMore from "@/components/common/ShowMore";
import Hero from "@/components/hero/page";
import { fuels, yearsOfProduction } from "@/constants";
import { FilterProps, HomeProps } from "@/types";
import { fetchCars } from "@/utils";
import Image from "next/image";

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  console.log("searchParams", params);
  const allCars = await fetchCars({
    manufacturer: params?.manufacturer || "",
    year: params?.year || 2022,
    fuel: params.fuel || "",
    limit: params.limit || 10,
    model: params.model || "",
  });
  const isDataEmpty =
    !Array.isArray(allCars) || allCars?.length < 1 || !allCars;
  // console.log('allCars', allCars)
  // console.log('isDataEmpty', isDataEmpty)
  return (
    <main className="">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore out cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar />

          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car) => (
                <CarCard car={car} />
              ))}
            </div>

            <ShowMore
              pageNumber={(params.limit || 10) / 10}
              isNext={(params.limit || 10) < allCars.length}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, no results</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
