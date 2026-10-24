import { Cafe, CuisineType } from '../types/cafe.ts';
import { INITIAL_CAFES } from '../data/cafesData.ts';

export interface CuisinePriceBenchmark {
  cuisine: CuisineType;
  cityAverage: number;
  cafeCount: number;
  difference: number; // cafe.costForTwo - cityAverage
  percentDiff: number; // ((cafe.costForTwo - cityAverage) / cityAverage) * 100
  index: number; // (cafe.costForTwo / cityAverage) * 100 (100 = parity)
}

export interface CafePriceIndexSummary {
  cafeCostForTwo: number;
  overallCityAverage: number;
  overallDifference: number;
  overallPercentDiff: number;
  overallIndex: number;
  primaryCuisineBenchmark: CuisinePriceBenchmark | null;
  cuisineBenchmarks: CuisinePriceBenchmark[];
  verdict: 'value' | 'moderate' | 'premium';
  verdictLabel: string;
  verdictDescription: string;
  minCityCost: number;
  maxCityCost: number;
}

/**
 * Calculates a comparative Price Index for a cafe against Guwahati city-wide
 * averages for its specific cuisine categories and overall dining averages.
 */
export function calculateCafePriceIndex(
  cafe: Cafe,
  allCafes: Cafe[] = INITIAL_CAFES
): CafePriceIndexSummary {
  const safeCafes = allCafes && allCafes.length > 0 ? allCafes : INITIAL_CAFES;
  const costs = safeCafes
    .map((c) => c.costForTwo)
    .filter((c) => typeof c === 'number' && c > 0);

  const minCityCost = costs.length > 0 ? Math.min(...costs) : 250;
  const maxCityCost = costs.length > 0 ? Math.max(...costs) : 1200;
  const overallCityAverage =
    costs.length > 0
      ? Math.round(costs.reduce((sum, val) => sum + val, 0) / costs.length)
      : 550;

  const cafeCost = cafe.costForTwo || 500;
  const overallDifference = cafeCost - overallCityAverage;
  const overallPercentDiff = Math.round(
    ((cafeCost - overallCityAverage) / (overallCityAverage || 1)) * 100
  );
  const overallIndex = Math.round((cafeCost / (overallCityAverage || 1)) * 100);

  // Compute benchmarks for each cuisine served by this cafe
  const cuisineBenchmarks: CuisinePriceBenchmark[] = (cafe.cuisineTypes || []).map(
    (cuisine) => {
      const matching = safeCafes.filter(
        (c) => Array.isArray(c.cuisineTypes) && c.cuisineTypes.includes(cuisine)
      );

      const matchingCosts = matching
        .map((c) => c.costForTwo)
        .filter((c) => typeof c === 'number' && c > 0);

      const avg =
        matchingCosts.length > 0
          ? Math.round(
              matchingCosts.reduce((sum, val) => sum + val, 0) / matchingCosts.length
            )
          : overallCityAverage;

      const diff = cafeCost - avg;
      const pct = Math.round(((cafeCost - avg) / (avg || 1)) * 100);
      const idx = Math.round((cafeCost / (avg || 1)) * 100);

      return {
        cuisine,
        cityAverage: avg,
        cafeCount: matching.length,
        difference: diff,
        percentDiff: pct,
        index: idx,
      };
    }
  );

  const primaryCuisineBenchmark =
    cuisineBenchmarks.length > 0 ? cuisineBenchmarks[0] : null;

  // Formulate verdict based on primary cuisine or overall index
  const benchmarkRef = primaryCuisineBenchmark || {
    cuisine: 'All Cafes' as CuisineType,
    cityAverage: overallCityAverage,
    cafeCount: safeCafes.length,
    difference: overallDifference,
    percentDiff: overallPercentDiff,
    index: overallIndex,
  };

  let verdict: 'value' | 'moderate' | 'premium' = 'moderate';
  let verdictLabel = 'On Par with City Average';
  let verdictDescription = `Priced right at the Guwahati benchmark for ${benchmarkRef.cuisine} (city avg ₹${benchmarkRef.cityAverage} for two).`;

  if (benchmarkRef.percentDiff <= -10) {
    verdict = 'value';
    const absPct = Math.abs(benchmarkRef.percentDiff);
    verdictLabel = `${absPct}% Below City Avg`;
    verdictDescription = `Priced ${absPct}% below the Guwahati average for ${benchmarkRef.cuisine} (city avg ₹${benchmarkRef.cityAverage} for two), offering high value for two guests.`;
  } else if (benchmarkRef.percentDiff >= 10) {
    verdict = 'premium';
    verdictLabel = `${benchmarkRef.percentDiff}% Above City Avg`;
    verdictDescription = `Priced ${benchmarkRef.percentDiff}% higher than the Guwahati average for ${benchmarkRef.cuisine} (city avg ₹${benchmarkRef.cityAverage} for two), reflecting specialty artisanal brews, gourmet plates, or heritage location.`;
  } else {
    verdict = 'moderate';
    const sign = benchmarkRef.percentDiff > 0 ? `+${benchmarkRef.percentDiff}%` : `${benchmarkRef.percentDiff}%`;
    verdictLabel = `On Par with City Avg (${sign})`;
    verdictDescription = `Evenly aligned with Guwahati's typical rate of ₹${benchmarkRef.cityAverage} for two in the ${benchmarkRef.cuisine} category.`;
  }

  return {
    cafeCostForTwo: cafeCost,
    overallCityAverage,
    overallDifference,
    overallPercentDiff,
    overallIndex,
    primaryCuisineBenchmark,
    cuisineBenchmarks,
    verdict,
    verdictLabel,
    verdictDescription,
    minCityCost,
    maxCityCost,
  };
}
