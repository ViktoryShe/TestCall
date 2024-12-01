import React, { useState } from 'react';
import { format } from 'date-fns';
import styles from './CallList.module.scss';
import { icons } from '../../assets/icons';

const CallList = ({ calls }) => {
  const [sortedCalls, setSortedCalls] = useState(calls);
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const formatDuration = (seconds) => `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;

  const getRatingIcon = (rating) => {
    const ratings = {
      1: icons.плохо,
      2: icons.хорошо,
      3: icons.отлично,
    };
    return ratings[rating] && <img src={ratings[rating]} alt={`Оценка: ${rating}`} className={styles.ratingIcon} />;
  };

  const handleSort = (key) => {
    const order = sortKey === key && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortKey(key);
    setSortOrder(order);

    const sorted = [...calls].sort((a, b) => {
      const aValue = key === 'date' ? new Date(a[key]) : a[key];
      const bValue = key === 'date' ? new Date(b[key]) : b[key];

      return order === 'asc'
        ? aValue > bValue
          ? 1
          : -1
        : aValue < bValue
        ? 1
        : -1;
    });

    setSortedCalls(sorted);
  };

  return (
    <div className={styles.callList}>
      <table>
        <thead>
          <tr>
            {['Тип', 'Время', 'Сотрудник', 'Звонок', 'Источник', 'Оценка', 'Длительность', 'Запись'].map((header, index) => (
              <th key={header} onClick={() => handleSort(['in_out', 'date', 'person_name', 'from_number', 'source', 'rating', 'time', 'record'][index])}>
                {header} {sortKey === ['in_out', 'date', 'person_name', 'from_number', 'source', 'rating', 'time', 'record'][index] && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedCalls.map(({ id, in_out, date, person_avatar, person_name, from_number, to_number, source, rating, time, record }) => (
            <tr key={id}>
              <td>
                <img 
                  src={in_out === 1 ? icons.incoming : icons.outgoing} 
                  alt={in_out === 1 ? 'Входящий' : 'Исходящий'} 
                  className={styles.icon} 
                />
              </td>
              <td>{format(new Date(date), 'HH:mm')}</td>
              <td>
                <img 
                  src={person_avatar || 'https://via.placeholder.com/32'} 
                  alt={person_name || 'Неизвестно'} 
                  className={styles.avatar} 
                />
                <span>{person_name || 'Неизвестно'}</span>
              </td>
              <td>{from_number || to_number}</td>
              <td>{source || 'Не указан'}</td>
              <td>{getRatingIcon(rating)}</td>
              <td>{time ? formatDuration(time) : '-'}</td>
              <td>
                {record ? (
                  <audio controls>
                    <source src={record} type="audio/mpeg" />
                    Ваш браузер не поддерживает элемент audio.
                  </audio>
                ) : (
                  'Нет записи'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CallList;