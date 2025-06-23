import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";


export default function Home() {
  return (
   <div>
    <h2>Welcome to My Next.js App</h2>
    <p>This is a simple Next.js application.</p>
   <Button>Button</Button>
   <UserButton/>
   </div>
  );
}
