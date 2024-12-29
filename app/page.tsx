"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";

// Definindo as cores para os tipos de matéria
const subjectStyles: Record<
  "devops" | "golang" | "spring" | "fund" | "outros" | "review",
  { background: string; textColor: string }
> = {
  devops: {
    background: "bg-gradient-to-r from-red-500 to-red-400",
    textColor: "text-white",
  },
  golang: {
    background: "bg-gradient-to-r from-blue-500 to-blue-400",
    textColor: "text-white",
  },
  spring: {
    background: "bg-gradient-to-r from-green-600 to-green-500",
    textColor: "text-white",
  },
  fund: {
    background: "bg-gradient-to-r from-orange-500 to-orange-400",
    textColor: "text-white",
  },
  outros: {
    background: "bg-gradient-to-r from-purple-600 to-purple-500",
    textColor: "text-white",
  },
  review: {
    background: "bg-gradient-to-r from-gray-600 to-gray-500",
    textColor: "text-white",
  },
};

const Schedule = () => {
  // Dados simulados de dias da semana e matérias
  const days: {
    name: string;
    subjects: { name: string; type: keyof typeof subjectStyles }[];
  }[] = [
    {
      name: "DOM",
      subjects: [
        { name: "Spring", type: "spring" },
        { name: "Review", type: "review" },
        { name: "Outros", type: "outros" },
      ],
    },
    {
      name: "SEG",
      subjects: [
        { name: "DevOps", type: "devops" },
        { name: "Golang", type: "golang" },
        { name: "Fund.", type: "fund" },
      ],
    },
    {
      name: "TER",
      subjects: [
        { name: "Golang", type: "golang" },
        { name: "Spring", type: "spring" },
        { name: "DevOps", type: "devops" },
      ],
    },
    {
      name: "QUA",
      subjects: [
        { name: "DevOps", type: "devops" },
        { name: "Golang", type: "golang" },
        { name: "Outros", type: "outros" },
      ],
    },
    {
      name: "QUI",
      subjects: [
        { name: "Spring", type: "spring" },
        { name: "DevOps", type: "devops" },
        { name: "Fund.", type: "fund" },
      ],
    },
    {
      name: "SEX",
      subjects: [
        { name: "Golang", type: "golang" },
        { name: "DevOps", type: "devops" },
        { name: "Spring", type: "spring" },
      ],
    },
    {
      name: "SAB",
      subjects: [
        { name: "DevOps", type: "devops" },
        { name: "Golang", type: "golang" },
        { name: "Fund.", type: "fund" },
      ],
    },
  ];

  // Estado para controlar o dia ativo
  const [activeDay, setActiveDay] = useState<number>(new Date().getDay());

  // Componente para mostrar a legenda dos tipos de matéria
  const Legend = () => (
    <div className="flex flex-wrap justify-center gap-4 p-4 bg-white rounded-lg shadow-sm">
      {Object.entries(subjectStyles).map(([type, { background }]) => (
        <div key={type} className="flex items-center gap-2">
          <div className={`w-4 h-4 rounded ${background}`} />
          <span className="text-sm capitalize">{type}</span>
        </div>
      ))}
    </div>
  );

  // Componente de matéria interativo
  const Subject = ({
    name,
    type,
    isActive,
    onClick,
  }: {
    name: string;
    type: keyof typeof subjectStyles;
    isActive?: boolean;
    onClick: () => void;
  }) => (
    <div
      onClick={onClick} // Evento de clique
      className={`${subjectStyles[type].background} p-3 rounded ${
        subjectStyles[type].textColor
      } text-center font-medium text-sm transition-all duration-200 ease-in-out hover:bg-opacity-20 hover:scale-[1.05] cursor-pointer ${
        isActive ? "ring-2 ring-blue-500" : "ring-2 ring-gray-300"
      }`}
    >
      {name}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center text-gray-800">
        Cronograma de Estudos - Juliano Laranjeira
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {days.map((day, index) => (
          <Card
            key={day.name}
            className={`overflow-hidden ${
              index === activeDay
                ? "ring-4 ring-blue-500 shadow-lg"
                : "hover:ring-2 hover:ring-blue-300"
            }`}
          >
            <div className="bg-gray-100 p-3 text-center font-bold text-gray-700">
              {day.name}
            </div>
            <div className="p-3 space-y-2">
              {day.subjects.map((subject, idx) => (
                <Subject
                  key={idx}
                  name={subject.name}
                  type={subject.type}
                  isActive={index === activeDay}
                  onClick={() => setActiveDay(index)} // Alterando o dia ativo
                />
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Legend />
    </div>
  );
};

export default Schedule;
