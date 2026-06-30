import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/constants";
import { LoginForm } from "./LoginForm";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function LoginPage({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return <LoginForm lang={lang} labels={dict.auth} />;
}
