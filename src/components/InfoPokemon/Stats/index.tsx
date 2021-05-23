import React, { useEffect, useState } from "react";
import { PokemonStat } from "../../../models/pokemon";
import { StatGrid, StatLabel, StatContainer } from "./style";

const translateStatsLabel = (name: string): string => {
  const dictionary: any = {
    hp: "HP",
    attack: "ATK",
    defense: "DEF",
    "special-attack": "SpA",
    "special-defense": "SpD",
    speed: "SPD",
    total: "TOT",
  };

  return dictionary[name];
};

const translateStatsColor = (name: string): string => {
  const dictionary: any = {
    hp: "water",
    attack: "ground",
    defense: "bug",
    "special-attack": "fighting",
    "special-defense": "grass",
    speed: "poison",
    total: "flying",
  };

  return dictionary[name];
};

interface StatProps extends PokemonStat {
  color?: string;
}

export const Stat: React.FC<StatProps> = ({ name, value, color }) => {
  return (
    <StatContainer color={color}>
      <StatLabel color={translateStatsColor(name)}>
        {translateStatsLabel(name)}
      </StatLabel>
      <span>{value}</span>
    </StatContainer>
  );
};

interface StatsProps {
  stats: PokemonStat[];
}

const Stats: React.FC<StatsProps> = ({ stats = [] }) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const t = stats.reduce((aggr, { value }) => (aggr += value), 0);
    setTotal(t);
  }, [stats]);

  return (
    <>
      <StatGrid>
        {stats.map((stat) => (
          <Stat key={stat.name} {...stat} />
        ))}
      </StatGrid>
      <Stat
        key="total"
        name="total"
        value={total}
        color={translateStatsColor("total")}
      />
    </>
  );
};

export default Stats;
