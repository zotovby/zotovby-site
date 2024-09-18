import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";

export default function Home() {
  const count = useSignal(3);
  return (
    <div class="px-4 py-8 mx-auto ">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <h1 class="text-5xl font-bold">Hi!👋</h1>
        <div class="pt-10">
        <h2 class=" text-3xl" > 🤙💬<a href="https://t.me/zotovby" class="no-underline hover:underline" >Telegram</a></h2>
        <h2 class=" text-3xl"> 📷👨‍🎨️ <a href="https://www.instagram.com/zotovby/" class="no-underline hover:underline" >Instagram</a> </h2>
        </div>
      </div>
    </div>
  );
}
