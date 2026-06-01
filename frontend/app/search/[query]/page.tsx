import UnifiedProtocol from "@/components/pdbp/UnifiedProtocol";
import { DEMO_QUERIES } from "@/lib/mock/pdbp-data";

interface SearchPageProps {
  params: Promise<{ query: string }>;
}

export function generateStaticParams() {
  return DEMO_QUERIES.map((query) => ({
    query: encodeURIComponent(query),
  }));
}

export default async function SearchPage({ params }: SearchPageProps) {
  const { query } = await params;
  const decodedQuery = decodeURIComponent(query);

  return <UnifiedProtocol query={decodedQuery} />;
}
