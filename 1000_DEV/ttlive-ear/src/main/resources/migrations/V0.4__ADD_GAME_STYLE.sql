insert into game_style(name, description, num_players, num_doubles, game_order, games_to_finish, finish_early) VALUES
('Bundessystem', '4er Mannschaft mit 2 Doppel und 8 Einzeln', 4, 2,'D1-D1;D2-D2;1-2;2-1;3-4;4-3;1-1;2-2;3-3;4-4', 10, false),
('Sechser-Paarkreuz-System', '6er Mannschaft mit 4 Doppel und 12 Einzel', 6, 2, 'D1-D2;D2-D1;D3-D3;1-2;2-1;3-4;4-3;5-6;6-5;1-1;2-2;3-3;4-4;5-5;6-6;D1-D1', 9, true),
('Dietze-Paarkreuz-System', '4er Mannschaft mit 2 Doppel, 8 Einzel und 2 Schlussdoppel', 4 ,2, 'D1-D2;D2-D1;1-2;2-1;3-4;4-3;1-1;2-2;3-3;4-4;D2-D2;D1-D1', 7, true);