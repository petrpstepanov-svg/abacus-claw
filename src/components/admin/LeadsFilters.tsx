'use client';

import React from 'react';

interface LeadsFiltersState {
  leadType: string;
  dateFilter: string;
  notificationStatus: string;
}

interface LeadsFiltersProps {
  filters: LeadsFiltersState;
  onFilterChange: (filters: LeadsFiltersState) => void;
}

function LeadsFilters({ filters, onFilterChange }: LeadsFiltersProps) {
  const handleChange = (key: keyof LeadsFiltersState, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const selectClass =
    'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-secondary ' +
    'outline-none focus:border-accent focus:ring-2 focus:ring-accent/30';

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {/* Тип заявки */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-secondary">Тип заявки</label>
        <select
          value={filters.leadType}
          onChange={(e) => handleChange('leadType', e.target.value)}
          className={selectClass}
        >
          <option value="all">Все типы</option>
          <option value="EVACUATION">Эвакуатор</option>
          <option value="SERVICE">Автосервис</option>
          <option value="ACCIDENT">Комиссар</option>
          <option value="CONTRACT">Агрегаты</option>
        </select>
      </div>

      {/* Дата */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-secondary">Период</label>
        <select
          value={filters.dateFilter}
          onChange={(e) => handleChange('dateFilter', e.target.value)}
          className={selectClass}
        >
          <option value="all">Все время</option>
          <option value="today">Сегодня</option>
          <option value="week">Неделя</option>
          <option value="month">Месяц</option>
        </select>
      </div>

      {/* Статус уведомлений */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-secondary">Уведомления</label>
        <select
          value={filters.notificationStatus}
          onChange={(e) => handleChange('notificationStatus', e.target.value)}
          className={selectClass}
        >
          <option value="all">Все</option>
          <option value="sent">Отправлены</option>
          <option value="not_sent">Не отправлены</option>
        </select>
      </div>
    </div>
  );
}

export { LeadsFilters };
export type { LeadsFiltersState, LeadsFiltersProps };
