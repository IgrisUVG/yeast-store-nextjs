import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function useSearchParamsRouter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const newSearchParams = new URLSearchParams(searchParams.toString());

  function navigate() {
    const newURL = `${pathname}${newSearchParams.size === 0 ? `` : `?${newSearchParams.toString()}`}`;
    router.push(newURL, {
      scroll: false,
    });
  }

  return {
    get(name: string) {
      return searchParams.get(name);
    },
    getAll(name: string) {
      return searchParams.getAll(name);
    },
    set(name: string, value: string) {
      newSearchParams.set(name, value);
      navigate();
    },
    append(name: string, value: string) {
      newSearchParams.append(name, value);
      navigate();
    },
    delete(name: string, value?: string) {
      newSearchParams.delete(name, value);
      navigate();
    }
  }
}
