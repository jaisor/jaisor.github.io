import { useMemo, useState, type ReactNode } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import type { DeviceCompareRow } from "../data/posts";
import { Inline } from "./Inline";

/**
 * Both tier scales, ordered low to high — the array index is the sort
 * rank. `filterLabel` names the tier on its pill (where the bracket it
 * stands for is worth spelling out), `label` inside the table cell.
 * The green/amber/red here is a deliberate exception to the site's
 * amber-on-neutral palette: these encode severity, not brand.
 */
const RF_POWER_TIERS = [
  {
    id: "normal",
    label: "Normal",
    filterLabel: "Normal",
    className: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  },
  {
    id: "high",
    label: "High",
    filterLabel: "High PA",
    className: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  },
  {
    id: "very-high",
    label: "Very high",
    filterLabel: "Very high PA (1W+)",
    className: "border-red-500/30 bg-red-500/10 text-red-300",
  },
] as const;

const POWER_TIERS = [
  {
    id: "low",
    label: "Low",
    filterLabel: "Low (nRF52)",
    className: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  },
  {
    id: "high",
    label: "High",
    filterLabel: "High (ESP32)",
    className: "border-red-500/30 bg-red-500/10 text-red-300",
  },
] as const;

type RfTier = DeviceCompareRow["rfPowerTier"];
type PowerTier = DeviceCompareRow["powerTier"];
type SortKey = "device" | "rfPower" | "power" | "price";
type SortDir = "asc" | "desc";

type Tier = { label: string; className: string };

const RF_BY_ID = new Map<RfTier, Tier>(RF_POWER_TIERS.map((t) => [t.id, t]));
const POWER_BY_ID = new Map<PowerTier, Tier>(POWER_TIERS.map((t) => [t.id, t]));

const RF_RANK = new Map<RfTier, number>(RF_POWER_TIERS.map((t, i) => [t.id, i]));
const POWER_RANK = new Map<PowerTier, number>(
  POWER_TIERS.map((t, i) => [t.id, i]),
);

/**
 * Sortable, filterable comparison table for `deviceCompare` blocks.
 * Filter pills narrow by RF power tier and power-draw tier; clicking a
 * column header sorts by that column (toggling direction on repeat
 * clicks). All client-side — the row data is small and static.
 */
export function DeviceCompareTable({
  rows,
  caption,
}: {
  rows: DeviceCompareRow[];
  caption?: string;
}) {
  const [rfFilter, setRfFilter] = useState<RfTier | "all">("all");
  const [powerFilter, setPowerFilter] = useState<PowerTier | "all">("all");
  const [sort, setSort] = useState<{ key: SortKey; dir: SortDir }>({
    key: "price",
    dir: "asc",
  });

  const visible = useMemo(() => {
    const filtered = rows.filter(
      (r) =>
        (rfFilter === "all" || r.rfPowerTier === rfFilter) &&
        (powerFilter === "all" || r.powerTier === powerFilter),
    );

    return [...filtered].sort((a, b) => {
      let cmp = 0;
      switch (sort.key) {
        case "device":
          cmp = a.device.localeCompare(b.device);
          break;
        case "rfPower":
          cmp = RF_RANK.get(a.rfPowerTier)! - RF_RANK.get(b.rfPowerTier)!;
          break;
        case "power":
          cmp = POWER_RANK.get(a.powerTier)! - POWER_RANK.get(b.powerTier)!;
          break;
        case "price":
          cmp = (a.price ?? Infinity) - (b.price ?? Infinity);
          break;
      }
      return sort.dir === "asc" ? cmp : -cmp;
    });
  }, [rows, rfFilter, powerFilter, sort]);

  function toggleSort(key: SortKey) {
    setSort((s) =>
      s.key === key
        ? { key, dir: s.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" },
    );
  }

  return (
    <figure>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-3">
        <PillGroup
          label="RF power"
          active={rfFilter}
          onChange={setRfFilter}
          options={RF_POWER_TIERS}
        />
        <PillGroup
          label="Power draw"
          active={powerFilter}
          onChange={setPowerFilter}
          options={POWER_TIERS}
        />
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-neutral-800 shadow-sm shadow-black/20 [corner-shape:bevel]">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-neutral-900/80">
              <SortableHeader
                label="Device"
                sortKey="device"
                sort={sort}
                onClick={toggleSort}
              />
              <SortableHeader
                label="RF power"
                sortKey="rfPower"
                sort={sort}
                onClick={toggleSort}
              />
              <SortableHeader
                label="Power draw"
                sortKey="power"
                sort={sort}
                onClick={toggleSort}
              />
              <SortableHeader
                label="Price"
                sortKey="price"
                sort={sort}
                onClick={toggleSort}
              />
            </tr>
          </thead>
          <tbody>
            {visible.map((row) => (
              <tr
                key={row.device}
                className="border-t border-neutral-800 bg-neutral-900/40"
              >
                <td className="px-4 py-3 align-top">
                  <a
                    href={row.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-amber-500 underline decoration-amber-500/40 underline-offset-2 transition hover:text-amber-400 hover:decoration-amber-400"
                  >
                    {row.device}
                  </a>
                  <p className="mt-1 font-mono text-xs text-neutral-500">
                    {row.chip} &middot; {row.rfPowerLabel}
                  </p>
                  {row.features.length > 0 && (
                    <ul className="mt-1.5 flex flex-wrap gap-1">
                      {row.features.map((feature) => (
                        <li
                          key={feature}
                          className="rounded border border-neutral-700 px-1.5 py-0.5 font-mono text-[10px] tracking-wider text-neutral-400 [corner-shape:bevel]"
                        >
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                </td>
                <td className="px-4 py-3 align-top whitespace-nowrap">
                  <TierLabel tier={RF_BY_ID.get(row.rfPowerTier)} />
                </td>
                <td className="px-4 py-3 align-top whitespace-nowrap">
                  <TierLabel tier={POWER_BY_ID.get(row.powerTier)} />
                </td>
                <td className="px-4 py-3 align-top whitespace-nowrap text-neutral-300">
                  {row.priceLabel}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {visible.length === 0 && (
        <p className="mt-4 text-center text-sm text-neutral-500">
          No nodes match these filters.
        </p>
      )}

      {caption && (
        <figcaption className="mt-3 text-sm text-neutral-500">
          <Inline text={caption} />
        </figcaption>
      )}
    </figure>
  );
}

function TierLabel({ tier }: { tier?: Tier }) {
  if (!tier) return null;
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium [corner-shape:bevel] ${tier.className}`}
    >
      {tier.label}
    </span>
  );
}

function PillGroup<T extends string>({
  label,
  active,
  onChange,
  options,
}: {
  label: string;
  active: T | "all";
  onChange: (value: T | "all") => void;
  options: readonly { id: T; filterLabel: string }[];
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="font-mono text-xs tracking-wider text-neutral-500 uppercase">
        {label}
      </span>
      <Pill active={active === "all"} onClick={() => onChange("all")}>
        All
      </Pill>
      {options.map((o) => (
        <Pill
          key={o.id}
          active={active === o.id}
          onClick={() => onChange(o.id)}
        >
          {o.filterLabel}
        </Pill>
      ))}
    </div>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition [corner-shape:bevel] ${
        active
          ? "border-amber-400 bg-amber-400 text-neutral-950"
          : "border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:border-neutral-700 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function SortableHeader({
  label,
  sortKey,
  sort,
  onClick,
}: {
  label: string;
  sortKey: SortKey;
  sort: { key: SortKey; dir: SortDir };
  onClick: (key: SortKey) => void;
}) {
  const active = sort.key === sortKey;
  return (
    <th
      scope="col"
      aria-sort={active ? (sort.dir === "asc" ? "ascending" : "descending") : "none"}
      className="px-4 py-3 font-mono text-xs tracking-wider whitespace-nowrap text-neutral-500 uppercase"
    >
      <button
        type="button"
        onClick={() => onClick(sortKey)}
        className="inline-flex items-center gap-1 transition hover:text-amber-400"
      >
        {label}
        {active ? (
          sort.dir === "asc" ? (
            <ArrowUp aria-hidden className="h-3 w-3" />
          ) : (
            <ArrowDown aria-hidden className="h-3 w-3" />
          )
        ) : (
          <ArrowUpDown aria-hidden className="h-3 w-3 opacity-40" />
        )}
      </button>
    </th>
  );
}
