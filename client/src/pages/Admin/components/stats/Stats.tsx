import React, { FC, useState } from 'react'
import './stats.scss'
import { useQuery } from 'react-query'
import Select from '../../../../components/ui/Select/Select'
interface StatsProps {

}

const Stats: FC<StatsProps> = ({ }) => {
      const [selectedStatsPeriod, setSelectedStatsPeriod] = useState<string>("week");
      const { isLoading, error, data } = useQuery('repoData', () =>
            fetch(`${import.meta.env.VITE_APP_API}/stats`).then(res =>
                  res.json()
            )
      )
      interface OrderStats {
            created: number;
            completed: number;
            avgExecutionTime: number
      }

      interface FetchedStats {
            today: OrderStats;
            week: OrderStats;
            month: OrderStats;
            year: OrderStats;
            [key: string]: OrderStats; // Добавляем индексную сигнатуру
      }

      const fetchedStats: FetchedStats = {
            today: {
                  created: data?.ordersCreatedToday,
                  completed: data?.ordersCompletedToday,
                  avgExecutionTime: data?.averageExecutionTimeTodayForAllUsers
            },
            week: {
                  created: data?.ordersCreatedThisWeek,
                  completed: data?.ordersCompletedThisWeek,
                  avgExecutionTime: data?.averageExecutionTimeThisWeekForAllUsers
            },
            month: {
                  created: data?.ordersCreatedThisMonth,
                  completed: data?.ordersCompletedThisMonth,
                  avgExecutionTime: data?.averageExecutionTimeThisMonthForAllUsers
            },
            year: {
                  created: data?.ordersCreatedThisYear,
                  completed: data?.ordersCompletedThisYear,
                  avgExecutionTime: data?.averageExecutionTimeThisYearForAllUsers
            }
      };
      return (
            <div className='dashboard-stats'>
                  <b>Период статистики</b>
                  <Select title={"Неделю"} setValue={setSelectedStatsPeriod}

                  >
                        <option value="today">Сегодня</option>
                        <option data-setdefault value="week">Неделю</option>
                        <option value="month">Месяц</option>
                        <option value="year">Год</option>
                  </Select>
                  <div className="items">
                        <div className="item">
                              <div className="icon">
                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M27.9867 2.24179C27.976 2.18997 27.9508 2.14227 27.9139 2.10429C27.8771 2.0663 27.8302 2.03961 27.7787 2.02734C24.3469 1.18827 16.4174 4.17831 12.1213 8.47265C11.355 9.2327 10.6565 10.0581 10.0336 10.9394C8.70877 10.8223 7.38397 10.9201 6.25487 11.4123C3.06912 12.8144 2.14158 16.473 1.88319 18.0469C1.86853 18.133 1.87406 18.2214 1.89934 18.305C1.92462 18.3887 1.96896 18.4653 2.02887 18.5289C2.08878 18.5925 2.16264 18.6413 2.24462 18.6716C2.32661 18.7018 2.41449 18.7126 2.50135 18.7031L7.61717 18.1389C7.62082 18.5246 7.6441 18.9098 7.6869 19.2932C7.71264 19.5594 7.83081 19.8081 8.02088 19.9963L10.0019 21.9726C10.1903 22.1625 10.4389 22.2806 10.7051 22.3066C11.0863 22.3493 11.4694 22.3725 11.8529 22.3764L11.2916 27.4857C11.2822 27.5726 11.2931 27.6604 11.3234 27.7423C11.3536 27.8242 11.4025 27.898 11.4661 27.9579C11.5296 28.0178 11.6062 28.0622 11.6898 28.0875C11.7734 28.1128 11.8617 28.1184 11.9478 28.1039C13.5187 27.8519 17.1838 26.9244 18.5777 23.7387C19.0699 22.6096 19.1707 21.2912 19.057 19.9728C19.9405 19.3499 20.7681 18.6512 21.5303 17.8846C25.8398 13.5967 28.8129 5.84413 27.9867 2.24179ZM17.2306 12.7693C16.8371 12.3761 16.5691 11.8749 16.4604 11.3293C16.3517 10.7837 16.4073 10.2181 16.6201 9.70407C16.833 9.19004 17.1934 8.75068 17.656 8.44156C18.1186 8.13244 18.6624 7.96744 19.2187 7.96744C19.7751 7.96744 20.3189 8.13244 20.7815 8.44156C21.244 8.75068 21.6045 9.19004 21.8173 9.70407C22.0301 10.2181 22.0857 10.7837 21.9771 11.3293C21.8684 11.8749 21.6003 12.3761 21.2068 12.7693C20.9459 13.0306 20.636 13.238 20.2948 13.3794C19.9537 13.5208 19.588 13.5937 19.2187 13.5937C18.8494 13.5937 18.4838 13.5208 18.1426 13.3794C17.8015 13.238 17.4916 13.0306 17.2306 12.7693Z" fill="#34C566" />
                                          <path d="M9.86719 23.4041C9.54609 23.7258 9.03106 23.8512 8.41113 23.9584C7.01836 24.1957 5.78848 22.9922 6.03867 21.5842C6.13418 21.0504 6.4166 20.3022 6.59238 20.1264C6.6308 20.0887 6.65638 20.0399 6.66547 19.9868C6.67457 19.9338 6.66672 19.8792 6.64304 19.8309C6.61936 19.7826 6.58106 19.7429 6.53358 19.7176C6.48609 19.6923 6.43184 19.6826 6.37852 19.6898C5.59966 19.7851 4.87508 20.1383 4.32012 20.693C2.94258 22.0717 2.8125 27.1875 2.8125 27.1875C2.8125 27.1875 7.93125 27.0574 9.30879 25.6787C9.86523 25.1242 10.2188 24.3985 10.3125 23.6186C10.3342 23.3736 10.0359 23.2277 9.86719 23.4041Z" fill="#34C566" />
                                    </svg>
                              </div>
                              <div className='stat-info'>
                                    <span className="title">Количество созданных задач</span>
                                    <h2 className="stat-info">{fetchedStats[selectedStatsPeriod].created}</h2>
                              </div>
                        </div>
                        <div className="item">
                              <div className="icon">
                                    <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <g clipPath="url(#clip0_4_2)">
                                                <path d="M11.5833 6.25H9.08334C8.4203 6.25 7.78442 6.51339 7.31558 6.98223C6.84674 7.45107 6.58334 8.08696 6.58334 8.75V23.75C6.58334 24.413 6.84674 25.0489 7.31558 25.5178C7.78442 25.9866 8.4203 26.25 9.08334 26.25H21.5833C22.2464 26.25 22.8823 25.9866 23.3511 25.5178C23.82 25.0489 24.0833 24.413 24.0833 23.75V8.75C24.0833 8.08696 23.82 7.45107 23.3511 6.98223C22.8823 6.51339 22.2464 6.25 21.5833 6.25H19.0833" stroke="#34C566" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M16.5833 3.75H14.0833C12.7026 3.75 11.5833 4.86929 11.5833 6.25C11.5833 7.63071 12.7026 8.75 14.0833 8.75H16.5833C17.9641 8.75 19.0833 7.63071 19.0833 6.25C19.0833 4.86929 17.9641 3.75 16.5833 3.75Z" stroke="#34C566" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M11.5833 17.5L14.0833 20L19.0833 15" stroke="#34C566" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                          </g>
                                          <defs>
                                                <clipPath id="clip0_4_2">
                                                      <rect width="30" height="30" fill="white" transform="translate(0.333344)" />
                                                </clipPath>
                                          </defs>
                                    </svg>
                              </div>
                              <div className='stat-info'>
                                    <span className="title">Количество выполненных задач</span>
                                    <h2 className="stat-info">{fetchedStats[selectedStatsPeriod].completed}</h2>
                              </div>
                        </div>
                        <div className="item">
                              <div className="icon">
                                    <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <g clipPath="url(#clip0_4_7)">
                                                <path d="M15.6666 26.25C21.8798 26.25 26.9166 21.2132 26.9166 15C26.9166 8.7868 21.8798 3.75 15.6666 3.75C9.45342 3.75 4.41663 8.7868 4.41663 15C4.41663 21.2132 9.45342 26.25 15.6666 26.25Z" stroke="#34C566" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M15.6666 8.75V15L19.4166 18.75" stroke="#34C566" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                          </g>
                                          <defs>
                                                <clipPath id="clip0_4_7">
                                                      <rect width="30" height="30" fill="white" transform="translate(0.666626)" />
                                                </clipPath>
                                          </defs>
                                    </svg>
                              </div>
                              <div className='stat-info'>
                                    <span className="title">Среднее время выполнения задач</span>
                                    <h2 className="stat-info">{fetchedStats[selectedStatsPeriod].avgExecutionTime}ч</h2>
                              </div>
                        </div>

                  </div>
            </div>
      )
}

export default Stats;