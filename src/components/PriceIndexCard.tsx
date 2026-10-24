import React, { useState } from 'react';
import {
  TrendingDown,
  TrendingUp,
  Scale,
  Sparkles,
  Info,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { Cafe, CuisineType } from '../types/cafe.ts';
import { calculateCafePriceIndex, CuisinePriceBenchmark } from '../utils/priceIndex.ts';

interface PriceIndexCardProps {
  cafe: Cafe;
  allCafes?: Cafe[];
  variant?: 'detailed' | 'compact';
}

export const PriceIndexCard: React.FC<PriceIndexCardProps> = ({
  cafe,
  allCafes = [],
  variant = 'detailed',
}) => {
  const summary = calculateCafePriceIndex(cafe, allCafes);
  
  // Allow user to toggle between different cuisine benchmarks if cafe has multiple
  const [selectedCuisine, setSelectedCuisine] = useState<CuisineType | null>(
    summary.cuisineBenchmarks.length > 0 ? summary.cuisineBenchmarks[0].cuisine : null
  );

  const activeBenchmark: CuisinePriceBenchmark | null =
    summary.cuisineBenchmarks.find((b) => b.cuisine === selectedCuisine) ||
    summary.primaryCuisineBenchmark ||
    null;

  const currentDiff = activeBenchmark
    ? activeBenchmark.difference
    : summary.overallDifference;
  const currentPercentDiff = activeBenchmark
    ? activeBenchmark.percentDiff
    : summary.overallPercentDiff;
  const currentIndex = activeBenchmark
    ? activeBenchmark.index
    : summary.overallIndex;
  const currentCityAvg = activeBenchmark
    ? activeBenchmark.cityAverage
    : summary.overallCityAverage;
  const currentCount = activeBenchmark
    ? activeBenchmark.cafeCount
    : allCafes.length;

  const isBelow = currentDiff < -15;
  const isAbove = currentDiff > 15;
  const isOnPar = !isBelow && !isAbove;

  // Percentage position on Guwahati price slider (range: min to max)
  const rangeSpan = Math.max(1, summary.maxCityCost - summary.minCityCost);
  const cafePct = Math.min(
    100,
    Math.max(0, ((summary.cafeCostForTwo - summary.minCityCost) / rangeSpan) * 100)
  );
  const avgPct = Math.min(
    100,
    Math.max(0, ((currentCityAvg - summary.minCityCost) / rangeSpan) * 100)
  );

  if (variant === 'compact') {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-stone-100 text-stone-800 border border-stone-200">
        {isBelow ? (
          <TrendingDown className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        ) : isAbove ? (
          <TrendingUp className="w-3.5 h-3.5 text-amber-700 shrink-0" />
        ) : (
          <Scale className="w-3.5 h-3.5 text-stone-600 shrink-0" />
        )}
        <span className="font-semibold">Price Index: {currentIndex}</span>
        <span className="text-stone-400">·</span>
        <span
          className={
            isBelow
              ? 'text-emerald-700 font-semibold'
              : isAbove
              ? 'text-amber-800 font-semibold'
              : 'text-stone-600'
          }
        >
          {isBelow
            ? `${Math.abs(currentPercentDiff)}% below city avg`
            : isAbove
            ? `${currentPercentDiff}% above city avg`
            : 'City benchmark parity'}
        </span>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-stone-200 bg-white shadow-xs overflow-hidden">
      {/* Header Banner */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-stone-50 via-amber-50/30 to-stone-50 border-b border-stone-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                isBelow
                  ? 'bg-emerald-100 text-emerald-800'
                  : isAbove
                  ? 'bg-amber-100 text-amber-900'
                  : 'bg-stone-200 text-stone-800'
              }`}
            >
              {isBelow ? (
                <TrendingDown className="w-5 h-5 text-emerald-700" />
              ) : isAbove ? (
                <TrendingUp className="w-5 h-5 text-amber-800" />
              ) : (
                <Scale className="w-5 h-5 text-stone-700" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-serif text-base font-bold text-stone-900 leading-tight">
                  Guwahati Price Index
                </h4>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    isBelow
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : isAbove
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-stone-100 text-stone-700 border border-stone-300'
                  }`}
                >
                  {isBelow ? 'Value-Forward' : isAbove ? 'Artisanal / Premium' : 'City Standard'}
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Comparative cost for two against Guwahati averages for{' '}
                <span className="font-semibold text-stone-800">
                  {activeBenchmark?.cuisine || 'this cuisine category'}
                </span>
              </p>
            </div>
          </div>

          {/* Index Numerical Badge */}
          <div className="flex items-center sm:flex-col sm:items-end justify-between border-t sm:border-t-0 pt-2 sm:pt-0 border-stone-200/80">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs text-stone-500 font-medium">Index Score:</span>
              <span className="font-mono text-xl sm:text-2xl font-black text-stone-900">
                {currentIndex}
              </span>
              <span className="text-xs text-stone-400 font-mono">/ 100 base</span>
            </div>
            <div className="text-xs font-semibold">
              {currentDiff < 0 ? (
                <span className="text-emerald-700">
                  {Math.abs(currentPercentDiff)}% below city cuisine avg
                </span>
              ) : currentDiff > 0 ? (
                <span className="text-amber-800">
                  +{currentPercentDiff}% above city cuisine avg
                </span>
              ) : (
                <span className="text-stone-600">Exact parity with city cuisine avg</span>
              )}
            </div>
          </div>
        </div>

        {/* Cuisine Selector Tabs if Cafe Offers Multiple Cuisines */}
        {summary.cuisineBenchmarks.length > 1 && (
          <div className="mt-4 pt-3 border-t border-stone-200/70 flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-[11px] uppercase font-bold text-stone-400 tracking-wider shrink-0">
              Compare Against:
            </span>
            <div className="flex items-center gap-1.5">
              {summary.cuisineBenchmarks.map((b) => {
                const isSelected = selectedCuisine === b.cuisine;
                return (
                  <button
                    key={b.cuisine}
                    onClick={() => setSelectedCuisine(b.cuisine)}
                    className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-stone-900 text-white shadow-xs font-semibold'
                        : 'bg-white/80 hover:bg-white text-stone-600 border border-stone-200/80'
                    }`}
                  >
                    <span>{b.cuisine}</span>
                    <span
                      className={`text-[10px] font-mono px-1 py-0.2 rounded ${
                        isSelected
                          ? 'bg-stone-700 text-stone-200'
                          : b.difference <= 0
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-800'
                      }`}
                    >
                      {b.difference <= 0 ? `${b.percentDiff}%` : `+${b.percentDiff}%`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Main Stats Grid */}
      <div className="p-4 sm:p-5 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* Card 1: This Cafe Cost */}
          <div className="p-3.5 rounded-lg border border-stone-200 bg-stone-50/70 flex flex-col justify-between">
            <div>
              <div className="text-[11px] uppercase font-bold tracking-wider text-stone-500 mb-0.5">
                {cafe.name}
              </div>
              <div className="flex items-baseline gap-1 font-mono">
                <span className="text-2xl font-bold text-stone-900">₹{summary.cafeCostForTwo}</span>
                <span className="text-xs text-stone-500 font-sans">for two</span>
              </div>
            </div>
            <p className="text-[11px] text-stone-500 mt-2 pt-2 border-t border-stone-200">
              Approx <span className="font-semibold text-stone-800">₹{Math.round(summary.cafeCostForTwo / 2)}</span> per person
            </p>
          </div>

          {/* Card 2: City Cuisine Average */}
          <div className="p-3.5 rounded-lg border border-stone-200 bg-stone-50/70 flex flex-col justify-between">
            <div>
              <div className="text-[11px] uppercase font-bold tracking-wider text-stone-500 mb-0.5 truncate">
                Guwahati {activeBenchmark?.cuisine || 'Cuisine'} Avg
              </div>
              <div className="flex items-baseline gap-1 font-mono">
                <span className="text-2xl font-bold text-stone-900">₹{currentCityAvg}</span>
                <span className="text-xs text-stone-500 font-sans">for two</span>
              </div>
            </div>
            <p className="text-[11px] text-stone-500 mt-2 pt-2 border-t border-stone-200">
              Based on <span className="font-semibold text-stone-800">{currentCount} Guwahati cafes</span>
            </p>
          </div>

          {/* Card 3: Difference / Savings */}
          <div
            className={`p-3.5 rounded-lg border flex flex-col justify-between ${
              isBelow
                ? 'bg-emerald-50/60 border-emerald-200'
                : isAbove
                ? 'bg-amber-50/60 border-amber-200'
                : 'bg-stone-50 border-stone-200'
            }`}
          >
            <div>
              <div className="text-[11px] uppercase font-bold tracking-wider text-stone-500 mb-0.5">
                Difference vs City Benchmark
              </div>
              <div className="flex items-baseline gap-1 font-mono">
                <span
                  className={`text-2xl font-bold ${
                    isBelow
                      ? 'text-emerald-700'
                      : isAbove
                      ? 'text-amber-900'
                      : 'text-stone-800'
                  }`}
                >
                  {currentDiff < 0
                    ? `-₹${Math.abs(currentDiff)}`
                    : currentDiff > 0
                    ? `+₹${currentDiff}`
                    : '₹0'}
                </span>
                <span className="text-xs font-sans text-stone-500">per pair</span>
              </div>
            </div>
            <p
              className={`text-[11px] mt-2 pt-2 border-t font-medium ${
                isBelow
                  ? 'border-emerald-200 text-emerald-800'
                  : isAbove
                  ? 'border-amber-200 text-amber-900'
                  : 'border-stone-200 text-stone-600'
              }`}
            >
              {isBelow
                ? `Saves approx ₹${Math.abs(currentDiff)} vs Guwahati avg`
                : isAbove
                ? `₹${currentDiff} premium over city avg`
                : 'Matches the Guwahati median rate'}
            </p>
          </div>

        </div>

        {/* Visual Guwahati Price Spectrum Bar */}
        <div className="p-4 rounded-lg bg-stone-50 border border-stone-200">
          <div className="flex items-center justify-between text-xs text-stone-600 mb-2">
            <span className="font-semibold text-stone-800">
              Guwahati Cafe Price Spectrum
            </span>
            <span className="text-[11px] text-stone-500 font-mono">
              City Range: ₹{summary.minCityCost} – ₹{summary.maxCityCost}
            </span>
          </div>

          {/* Interactive Progress Track */}
          <div className="relative h-4 bg-stone-200 rounded-full overflow-visible my-6">
            {/* Visual gradient fill for budget to luxury */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-200 via-amber-200 to-rose-200 opacity-60" />

            {/* City Cuisine Average Marker */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 flex flex-col items-center"
              style={{ left: `${avgPct}%` }}
              title={`Guwahati ${activeBenchmark?.cuisine || ''} Average: ₹${currentCityAvg}`}
            >
              <div className="w-1 h-6 bg-stone-600 rounded-full ring-2 ring-white shadow-xs" />
              <div className="absolute top-7 bg-stone-800 text-white text-[10px] font-mono px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap">
                Avg ₹{currentCityAvg}
              </div>
            </div>

            {/* This Cafe Marker */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
              style={{ left: `${cafePct}%` }}
              title={`${cafe.name}: ₹${summary.cafeCostForTwo}`}
            >
              <div
                className={`w-4 h-4 rounded-full border-2 border-white shadow-md ${
                  isBelow
                    ? 'bg-emerald-600 ring-2 ring-emerald-400'
                    : isAbove
                    ? 'bg-amber-600 ring-2 ring-amber-400'
                    : 'bg-stone-900 ring-2 ring-stone-400'
                }`}
              />
              <div className="absolute -top-7 bg-stone-900 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow whitespace-nowrap flex items-center gap-1">
                <span>{cafe.name}</span>
                <span className="text-amber-300 font-mono">₹{summary.cafeCostForTwo}</span>
              </div>
            </div>
          </div>

          {/* Legend and Guwahati Context */}
          <div className="flex flex-wrap items-center justify-between text-[11px] text-stone-500 pt-3 border-t border-stone-200 gap-2">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-stone-900" />
                <span className="text-stone-700 font-medium">This Cafe</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-1 bg-stone-600 rounded-full" />
                <span className="text-stone-700 font-medium">
                  Guwahati {activeBenchmark?.cuisine || 'Cuisine'} Average
                </span>
              </span>
            </div>
            <div className="text-stone-500 italic">
              City-wide all-cafe average: <span className="font-mono font-medium text-stone-700">₹{summary.overallCityAverage}</span>
            </div>
          </div>
        </div>

        {/* Editorial Context & Recommendation */}
        <div className="text-xs text-stone-600 flex items-start gap-2 bg-amber-50/50 p-3 rounded-lg border border-amber-200/60">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-stone-900 font-semibold">{summary.verdictLabel}: </strong>
            {summary.verdictDescription}{' '}
            At ₹{summary.cafeCostForTwo} for two, this establishment falls in the{' '}
            <strong className="text-stone-800">{cafe.priceRange} bracket</strong> in the Guwahati cafe landscape.
          </p>
        </div>

      </div>
    </div>
  );
};
