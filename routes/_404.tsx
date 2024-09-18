import { Head } from "$fresh/runtime.ts";

export default function Error404() {
  return (
    <>
      <Head>
        <title>404 - Page not found</title>
      </Head>
      <div class="px-4 py-8 mx-auto ">
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
          <img
            class="my-6"
            src="/wtf.gif"
            width="256"
            height="256"
            alt="Pulp fiction character"
          />
          <p class="my-4 text-center">
          John Travolta once did intense '80s aerobics scenes in the movie Perfect, and the hilarious outfits still inspire memes today!
          </p>
          <a href="/" class="underline">take me home</a>
        </div>
      </div>
    </>
  );
}
