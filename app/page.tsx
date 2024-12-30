"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

type SubjectType =
  | "devops"
  | "golang"
  | "spring"
  | "fund"
  | "others"
  | "review";

type SubjectStyle = {
  background: string;
  textColor: string;
};

const subjectStyles: Record<SubjectType, SubjectStyle> = {
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
  others: {
    background: "bg-gradient-to-r from-purple-600 to-purple-500",
    textColor: "text-white",
  },
  review: {
    background: "bg-gradient-to-r from-gray-600 to-gray-500",
    textColor: "text-white",
  },
};

interface Subject {
  name: string;
  type: SubjectType;
}

interface Day {
  name: string;
  dayIndex: number;
  subjects: Subject[];
}

const Schedule = () => {
  const days: Day[] = [
    {
      name: "SUN",
      dayIndex: 0,
      subjects: [
        { name: "Spring", type: "spring" },
        { name: "Review", type: "review" },
        { name: "Others", type: "others" },
      ],
    },
    {
      name: "MON",
      dayIndex: 1,
      subjects: [
        { name: "DevOps", type: "devops" },
        { name: "Golang", type: "golang" },
        { name: "Fund.", type: "fund" },
      ],
    },
    {
      name: "TUE",
      dayIndex: 2,
      subjects: [
        { name: "Golang", type: "golang" },
        { name: "Spring", type: "spring" },
        { name: "DevOps", type: "devops" },
      ],
    },
    {
      name: "WED",
      dayIndex: 3,
      subjects: [
        { name: "DevOps", type: "devops" },
        { name: "Golang", type: "golang" },
        { name: "Others", type: "others" },
      ],
    },
    {
      name: "THU",
      dayIndex: 4,
      subjects: [
        { name: "Spring", type: "spring" },
        { name: "DevOps", type: "devops" },
        { name: "Fund.", type: "fund" },
      ],
    },
    {
      name: "FRI",
      dayIndex: 5,
      subjects: [
        { name: "Golang", type: "golang" },
        { name: "DevOps", type: "devops" },
        { name: "Spring", type: "spring" },
      ],
    },
    {
      name: "SAT",
      dayIndex: 6,
      subjects: [
        { name: "DevOps", type: "devops" },
        { name: "Golang", type: "golang" },
        { name: "Fund.", type: "fund" },
      ],
    },
  ];

  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState<string>("");

  const getCurrentDayAndTime = () => {
    const now = new Date();
    const day = now.getDay();
    const localTime = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const localDate = now.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return { day, localTime, localDate };
  };

  useEffect(() => {
    const updateDateTime = () => {
      const { day, localTime, localDate } = getCurrentDayAndTime();
      setActiveDay(day);
      setCurrentTime(`${localDate} - ${localTime}`);
      setIsLoading(false);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const Legend = () => (
    <div className="flex flex-wrap justify-center gap-4 p-4 bg-white rounded-lg shadow-sm">
      {(Object.entries(subjectStyles) as [SubjectType, SubjectStyle][]).map(
        ([type, { background }]) => (
          <div key={type} className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded ${background}`} />
            <span className="text-sm capitalize">{type}</span>
          </div>
        )
      )}
    </div>
  );

  interface SubjectProps {
    name: string;
    type: SubjectType;
    isActive?: boolean;
    onClick: () => void;
  }

  const Subject = ({ name, type, isActive, onClick }: SubjectProps) => (
    <div
      onClick={onClick}
      className={`${subjectStyles[type].background} p-3 rounded ${
        subjectStyles[type].textColor
      } text-center font-medium text-sm transition-all duration-200 ease-in-out hover:bg-opacity-20 hover:scale-[1.05] cursor-pointer ${
        isActive ? "ring-2 ring-blue-500" : "ring-2 ring-gray-300"
      }`}
    >
      {name}
    </div>
  );

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-4 space-y-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-6"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-48 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-gray-800">
          Study Schedule - Juliano Laranjeira
        </h1>
        <p className="text-sm text-gray-600 font-mono">{currentTime}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {days.map((day) => (
          <Card
            key={day.name}
            className={`overflow-hidden ${
              day.dayIndex === activeDay
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
                  isActive={day.dayIndex === activeDay}
                  onClick={() => setActiveDay(day.dayIndex)}
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
