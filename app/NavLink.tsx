import Link from "next/link";

type NavLinkProps = {
  category: string;
  isActive: boolean;
};

function NavLink({ category, isActive }: NavLinkProps) {
  return (
    <Link
      className={`navLink ${
        isActive &&
        "underline decoration-orange-400 underline-offset-4 font-bold text-lg"
      }`}
      href={`/news/${category}`}
    >
      {category}
    </Link>
  );
}

export default NavLink;
