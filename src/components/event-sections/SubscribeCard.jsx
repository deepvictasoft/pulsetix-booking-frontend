// "use client";
// import { useState } from "react";
// import Icon from "../ui/Icon";
// import Typography from "../ui/Typography";
// import Button from "../ui/Button";

// const SubscribeCard = () => {
//   const [email, setEmail] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // TODO: wire up to newsletter API
//     setEmail("");
//   };

//   return (
//     <section className="max-w-7xl mx-auto px-6 lg:px-10 py-6">
//       <div className="flex flex-col md:flex-row md:items-center gap-5 rounded-2xl border border-secondary-border bg-sidebar-bg/60 px-6 py-5">
//         <div className="flex items-center gap-4 flex-1">
//           <div className="w-11 h-11 shrink-0 rounded-full bg-primary/15 flex items-center justify-center">
//             <Icon name="Mail" width={20} height={20} className="text-primary" />
//           </div>

//           <div>
//             <Typography variant="title" className="mb-0.5">
//               Don&apos;t miss out on the best events
//             </Typography>
//             <Typography variant="subtitle">
//               Get personalised recommendations and exclusive updates straight to
//               your inbox.
//             </Typography>
//           </div>
//         </div>
   
//         <form
//           onSubmit={handleSubmit}
//           className="flex items-center gap-3 md:w-auto rounded-2xl border border-primary-border pl-4 focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/60"
//         >
//           <input
//             type="email"
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email"
//             className="bg-transparent outline-none text-sm text-foreground-text placeholder:text-muted-text"
//           />
//           <Button
//             type="submit"
//             variant="primary"
//             size="lg"
//             className="shrink-0"
//           >
//             Subscribe
//           </Button>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default SubscribeCard;

"use client";
import { useState } from "react";
import Icon from "../ui/Icon";
import Typography from "../ui/Typography";
import Button from "../ui/Button";

const SubscribeCard = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire up to newsletter API
    setEmail("");
  };

  return (
    <section className="mx-auto px-6 lg:px-10 xl:px-14 2xl:px-20 py-6">
      <div className="flex flex-col md:flex-row md:items-center gap-5 rounded-2xl border border-secondary-border bg-sidebar-bg/60 px-6 py-5">
        <div className="flex items-center gap-4 flex-1">
          <div className="w-11 h-11 shrink-0 rounded-full bg-gradient flex items-center justify-center">
            <Icon name="Mail" width={20} height={20} className="text-white" />
          </div>

          <div>
            <Typography variant="title" className="mb-0.5">
              Don&apos;t miss out on the best events
            </Typography>
            <Typography variant="subtitle">
              Get personalised recommendations and exclusive updates straight to
              your inbox.
            </Typography>
          </div>
        </div>
   
        <form
          onSubmit={handleSubmit}
          className="flex w-full min-w-0 items-center gap-3 md:w-auto rounded-[40px] border border-primary-border pl-4 focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/60"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="min-w-0 flex-1 bg-transparent outline-none text-sm text-foreground-text placeholder:text-muted-text"
          />
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="shrink-0"
          >
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
};

export default SubscribeCard;