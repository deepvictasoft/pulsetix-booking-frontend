import { Suspense } from "react";
import LoginPage from "@/components/auth-sections/LoginPage";

export const metadata = {
    title: "Log In – PulseTix",
    description: "Log in to your PulseTix account.",
};

export default function Page() {
    return (
        <Suspense fallback={null}>
            <LoginPage />
        </Suspense>
    );
}