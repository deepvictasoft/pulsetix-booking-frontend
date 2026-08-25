// Auth pages get no header/footer — the SignupPage is full-viewport
export default function SignupLayout({ children }) {
    return (
        <div className="min-h-screen bg-background">
            {children}
        </div>
    );
}