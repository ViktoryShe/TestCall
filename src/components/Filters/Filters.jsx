import React, { useState, useCallback } from "react";
import DatePicker from "react-datepicker";
import { subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from "date-fns";
import { ru } from 'date-fns/locale';
import { X } from 'lucide-react';
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Filters.module.scss";

const Filters = ({ onFilterChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [callType, setCallType] = useState("");
  const [activePeriod, setActivePeriod] = useState(null);

  const handleDateRangeSelect = useCallback((period) => {
    const today = new Date();
    let start, end;

    switch (period) {
      case '3days':
        start = subDays(today, 3);
        end = today;
        break;
      case 'week':
        start = startOfWeek(today, { weekStartsOn: 1 });
        end = endOfWeek(today, { weekStartsOn: 1 });
        break;
      case 'month':
        start = startOfMonth(today);
        end = endOfMonth(today);
        break;
      case 'year':
        start = startOfYear(today);
        end = endOfYear(today);
        break;
      default:
        start = null;
        end = null;
    }

    setStartDate(start);
    setEndDate(end);
    setActivePeriod(period);
    onFilterChange({ dateStart: start, dateEnd: end, inOut: callType });
  }, [onFilterChange, callType]);

  const handleCustomDateChange = (date, type) => {
    if (type === "start") {
      setStartDate(date);
      onFilterChange({ dateStart: date, dateEnd: endDate, inOut: callType });
    } else {
      setEndDate(date);
      onFilterChange({ dateStart: startDate, dateEnd: date, inOut: callType });
    }
    setActivePeriod('custom');
  };

  const handleCallTypeChange = (value) => {
    setCallType(value);
    onFilterChange({ inOut: value, dateStart: startDate, dateEnd: endDate });
  };

  const resetFilters = () => {
    setStartDate(null);
    setEndDate(null);
    setCallType("");
    setActivePeriod(null);
    onFilterChange({ dateStart: null, dateEnd: null, inOut: "" });
  };

  const hasActiveFilters = startDate || endDate || callType || activePeriod;

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.leftFilters}>
        <select 
          className={styles.select}
          value={callType}
          onChange={(e) => handleCallTypeChange(e.target.value)}
        >
          <option value="">Все типы</option>
          <option value="1">Входящие</option>
          <option value="2">Исходящие</option>
        </select>

        {hasActiveFilters && (
          <button className={styles.resetButton} onClick={resetFilters}>
            <X size={16} />
            Сбросить фильтры
          </button>
        )}
      </div>

      <div className={styles.rightFilters}>
        <div className={styles.dateRangeWrapper}>
          <select 
            className={styles.select}
            value={activePeriod || ""}
            onChange={(e) => handleDateRangeSelect(e.target.value)}
          >
            <option value="">Выберите период</option>
            <option value="3days">3 дня</option>
            <option value="week">Неделя</option>
            <option value="month">Месяц</option>
            <option value="year">Год</option>
            <option value="custom">Указать промежуток</option>
          </select>

          {activePeriod === "custom" && (
            <div className={styles.customDatePicker}>
              <DatePicker
                selected={startDate}
                onChange={(date) => handleCustomDateChange(date, "start")}
                placeholderText="Начальная дата"
                locale={ru}
                dateFormat="dd.MM.yyyy"
              />
              <span>по</span>
              <DatePicker
                selected={endDate}
                onChange={(date) => handleCustomDateChange(date, "end")}
                placeholderText="Конечная дата"
                locale={ru}
                dateFormat="dd.MM.yyyy"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filters;