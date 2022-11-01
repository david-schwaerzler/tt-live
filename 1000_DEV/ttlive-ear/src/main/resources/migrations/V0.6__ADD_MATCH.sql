
--
-- Data for Name: match; Type: TABLE DATA; Schema: ttlive; Owner: ttlive
--

INSERT INTO ttlive.match (id, state, title, description, home_team_score, guest_team_score, editorcode, code, league_id, home_team_id, guest_team_id, game_style_id, account_id, created_at, modified_at, start_date) 
VALUES (1, 'LIVE', '', '', 4, 1, '21g7ot', 'zm43v1', 1, 3, 11, 1, NULL, '2022-10-19 00:26:30.799099', '2022-10-19 00:26:30.799817', '2022-10-19 12:30:00');

INSERT INTO ttlive.doubles (id, "position", is_home_team, player_1, player_2, match_id) VALUES (1, 1, true, 'Ackermann Tim', 'Meyhöfer Morris ', 1);
INSERT INTO ttlive.doubles (id, "position", is_home_team, player_1, player_2, match_id) VALUES (2, 1, false, 'Louis Arne', 'Herzog Julian', 1);
INSERT INTO ttlive.doubles (id, "position", is_home_team, player_1, player_2, match_id) VALUES (3, 2, true, 'Fründt Wolfgang', 'Wendt Johan', 1);
INSERT INTO ttlive.doubles (id, "position", is_home_team, player_1, player_2, match_id) VALUES (4, 2, false, 'Reinhardt Finn Philip', 'Thüne Nisse', 1);


INSERT INTO ttlive.player (id, name, "position", is_home_team, created_at, modified_at, match_id) VALUES (1, 'Louis Arne', 1, true, '2022-10-19 00:26:30.822851', '2022-10-19 00:26:30.822892', 1);
INSERT INTO ttlive.player (id, name, "position", is_home_team, created_at, modified_at, match_id) VALUES (2, 'Ackermann Tim', 2, true, '2022-10-19 00:26:30.828682', '2022-10-19 00:26:30.828706', 1);
INSERT INTO ttlive.player (id, name, "position", is_home_team, created_at, modified_at, match_id) VALUES (3, 'Meyhöfer Morris', 3, true, '2022-10-19 00:26:30.832433', '2022-10-19 00:26:30.832458', 1);
INSERT INTO ttlive.player (id, name, "position", is_home_team, created_at, modified_at, match_id) VALUES (4, 'Bremer Tim', 4, true, '2022-10-19 00:26:30.836822', '2022-10-19 00:26:30.836846', 1);
INSERT INTO ttlive.player (id, name, "position", is_home_team, created_at, modified_at, match_id) VALUES (5, 'Reinhardt Finn Philip', 1, false, '2022-10-19 00:26:30.848047', '2022-10-19 00:26:30.848069', 1);
INSERT INTO ttlive.player (id, name, "position", is_home_team, created_at, modified_at, match_id) VALUES (6, 'Thüne Nisse', 2, false, '2022-10-19 00:26:30.849887', '2022-10-19 00:26:30.849914', 1);
INSERT INTO ttlive.player (id, name, "position", is_home_team, created_at, modified_at, match_id) VALUES (7, 'Fründt Wolfgang', 3, false, '2022-10-19 00:26:30.852511', '2022-10-19 00:26:30.852536', 1);
INSERT INTO ttlive.player (id, name, "position", is_home_team, created_at, modified_at, match_id) VALUES (8, 'Wendt Johan', 4, false, '2022-10-19 00:26:30.854056', '2022-10-19 00:26:30.854077', 1);


INSERT INTO ttlive.game (id, game_number, state, is_doubles, set1, set2, set3, set4, set5, home_sets, guest_sets, match_id, home_player_id, guest_player_id, home_doubles_id, guest_doubles_id, created_at, modified_at) VALUES 
(1, 1, 'FINISHED', true, '11:5', '11:8', '11:6', NULL, NULL, 3, 0,1, NULL, NULL, 1, 2, '2022-10-19 00:26:30.816603', '2022-10-19 00:26:30.816636');
INSERT INTO ttlive.game (id, game_number, state, is_doubles, set1, set2, set3, set4, set5, home_sets, guest_sets, match_id, home_player_id, guest_player_id, home_doubles_id, guest_doubles_id, created_at, modified_at) VALUES 
(2, 2, 'FINISHED', true, '11:3', '11:8', '6:11', '11:6', NULL, 3, 1, 1, NULL, NULL, 3, 4, '2022-10-19 00:26:30.819457', '2022-10-19 00:26:30.819495');
INSERT INTO ttlive.game (id, game_number, state, is_doubles, set1, set2, set3, set4, set5, home_sets, guest_sets, match_id, home_player_id, guest_player_id, home_doubles_id, guest_doubles_id, created_at, modified_at) VALUES 
(3, 3, 'FINISHED', false, '9:11', '11:5', '13:11', '11:9', NULL,3, 1, 1, 1, 6, NULL, NULL, '2022-10-19 00:26:30.826632', '2022-10-19 00:26:30.8656');
INSERT INTO ttlive.game (id, game_number, state, is_doubles, set1, set2, set3, set4, set5, home_sets, guest_sets, match_id, home_player_id, guest_player_id, home_doubles_id, guest_doubles_id, created_at, modified_at) VALUES 
(4, 4, 'LIVE', false, '11:5', '11:9', '7:11', '6:11', '10:11', 2,3, 1, 2, 5, NULL, NULL, '2022-10-19 00:26:30.830755', '2022-10-19 00:26:30.86895');
INSERT INTO ttlive.game (id, game_number, state, is_doubles, set1, set2, set3, set4, set5, home_sets, guest_sets, match_id, home_player_id, guest_player_id, home_doubles_id, guest_doubles_id, created_at, modified_at) VALUES 
(5, 5, 'LIVE', false, '11:6', '11:6', '3:11', '11:2', NULL,3,1, 1, 3, 8, NULL, NULL, '2022-10-19 00:26:30.834396', '2022-10-19 00:26:30.870203');
INSERT INTO ttlive.game (id, game_number, state, is_doubles, set1, set2, set3, set4, set5, home_sets, guest_sets, match_id, home_player_id, guest_player_id, home_doubles_id, guest_doubles_id, created_at, modified_at) VALUES 
(6, 6, 'NOT_STARTED',false, NULL, NULL, NULL, NULL, NULL, 0,0,1, 4, 7, NULL, NULL, '2022-10-19 00:26:30.838306', '2022-10-19 00:26:30.871302');
INSERT INTO ttlive.game (id, game_number, state, is_doubles, set1, set2, set3, set4, set5, home_sets, guest_sets, match_id, home_player_id, guest_player_id, home_doubles_id, guest_doubles_id, created_at, modified_at) VALUES 
(7, 7, 'NOT_STARTED', false, NULL, NULL, NULL, NULL, NULL, 0,0,1, 1, 5, NULL, NULL, '2022-10-19 00:26:30.84044', '2022-10-19 00:26:30.87229');
INSERT INTO ttlive.game (id, game_number, state, is_doubles, set1, set2, set3, set4, set5, home_sets, guest_sets, match_id, home_player_id, guest_player_id, home_doubles_id, guest_doubles_id, created_at, modified_at) VALUES 
(8, 8, 'NOT_STARTED', false, NULL, NULL, NULL, NULL, NULL, 0,0,1, 2, 6, NULL, NULL, '2022-10-19 00:26:30.84268', '2022-10-19 00:26:30.873691');
INSERT INTO ttlive.game (id, game_number, state, is_doubles, set1, set2, set3, set4, set5, home_sets, guest_sets, match_id, home_player_id, guest_player_id, home_doubles_id, guest_doubles_id, created_at, modified_at) VALUES 
(9, 9, 'NOT_STARTED', false, NULL, NULL, NULL, NULL, NULL, 0,0,1, 3, 7, NULL, NULL, '2022-10-19 00:26:30.844528', '2022-10-19 00:26:30.877327');
INSERT INTO ttlive.game (id, game_number, state, is_doubles, set1, set2, set3, set4, set5, home_sets, guest_sets, match_id, home_player_id, guest_player_id, home_doubles_id, guest_doubles_id, created_at, modified_at) VALUES 
(10, 10, 'NOT_STARTED', false, NULL, NULL, NULL, NULL, NULL, 0,0,1, 4, 8, NULL, NULL, '2022-10-19 00:26:30.846272', '2022-10-19 00:26:30.878881');



INSERT INTO ttlive.match (id, state, title, description, home_team_score, guest_team_score, editorcode, code, league_id, home_team_id, guest_team_id, game_style_id, account_id, created_at, modified_at, start_date) 
VALUES (2, 'NOT_STARTED', '', '', 0, 5, 'rnz6ts', '5y3sd4', 1, 9, 2, 1, NULL, '2022-10-19 14:24:49.519367', '2022-10-19 14:24:49.520146', '2022-10-19 13:30:00');

INSERT INTO ttlive.doubles (id, "position", is_home_team, player_1, player_2, match_id) VALUES (5, 1, true, 'Gez Waldemar', 'Heuck Francisco', 2);
INSERT INTO ttlive.doubles (id, "position", is_home_team, player_1, player_2, match_id) VALUES (6, 1, false, 'Almér Gustaf', 'Schütt Marcel', 2);
INSERT INTO ttlive.doubles (id, "position", is_home_team, player_1, player_2, match_id) VALUES (7, 2, true, 'Baum Sebastian', 'Winterberg Nils', 2);
INSERT INTO ttlive.doubles (id, "position", is_home_team, player_1, player_2, match_id) VALUES (8, 2, false, 'Schmidt Tobias', 'Stockhammer Daniel', 2);

INSERT INTO ttlive.player (id, name, "position", is_home_team, created_at, modified_at, match_id) VALUES (9, 'Gez Waldemar', 1, true, '2022-10-19 14:24:49.610196', '2022-10-19 14:24:49.61022', 2);
INSERT INTO ttlive.player (id, name, "position", is_home_team, created_at, modified_at, match_id) VALUES (10, 'Heuck Francisco', 2, true, '2022-10-19 14:24:49.613717', '2022-10-19 14:24:49.61374', 2);
INSERT INTO ttlive.player (id, name, "position", is_home_team, created_at, modified_at, match_id) VALUES (11, 'Almér Gustaf', 3, true, '2022-10-19 14:24:49.616331', '2022-10-19 14:24:49.616357', 2);
INSERT INTO ttlive.player (id, name, "position", is_home_team, created_at, modified_at, match_id) VALUES (12, 'Schütt Marcel', 4, true, '2022-10-19 14:24:49.619035', '2022-10-19 14:24:49.619058', 2);
INSERT INTO ttlive.player (id, name, "position", is_home_team, created_at, modified_at, match_id) VALUES (13, 'Schmidt Tobias', 1, false, '2022-10-19 14:24:49.624471', '2022-10-19 14:24:49.624496', 2);
INSERT INTO ttlive.player (id, name, "position", is_home_team, created_at, modified_at, match_id) VALUES (14, 'Baum Sebastian', 2, false, '2022-10-19 14:24:49.625661', '2022-10-19 14:24:49.625685', 2);
INSERT INTO ttlive.player (id, name, "position", is_home_team, created_at, modified_at, match_id) VALUES (15, 'Stockhammer Daniel', 3, false, '2022-10-19 14:24:49.626462', '2022-10-19 14:24:49.62648', 2);
INSERT INTO ttlive.player (id, name, "position", is_home_team, created_at, modified_at, match_id) VALUES (16, 'Krause Tom', 4, false, '2022-10-19 14:24:49.627149', '2022-10-19 14:24:49.627167', 2);

INSERT INTO ttlive.game (id, game_number, state, is_doubles, set1, set2, set3, set4, set5, home_sets, guest_sets, match_id, home_player_id, guest_player_id, home_doubles_id, guest_doubles_id, created_at, modified_at) VALUES 
(11, 1, 'FINISHED', true, '11:5', '11:13', '10:12', '8:11', NULL,1,3, 2, NULL, NULL, 5, 6, '2022-10-19 14:24:49.593891', '2022-10-19 14:24:49.59392');
INSERT INTO ttlive.game (id, game_number, state, is_doubles, set1, set2, set3, set4, set5, home_sets, guest_sets, match_id, home_player_id, guest_player_id, home_doubles_id, guest_doubles_id, created_at, modified_at) VALUES
 (12, 2, 'FINISHED', true, '10:12', '10:12', '6:11', NULL, NULL, 0,3,2, NULL, NULL, 7, 8, '2022-10-19 14:24:49.60735', '2022-10-19 14:24:49.60738');
INSERT INTO ttlive.game (id, game_number, state, is_doubles, set1, set2, set3, set4, set5, home_sets, guest_sets, match_id, home_player_id, guest_player_id, home_doubles_id, guest_doubles_id, created_at, modified_at) VALUES 
(13, 3, 'FINISHED', false, '20:18', '5:11', '5:11', '6:11', NULL, 1,3,2, 9, 14, NULL, NULL, '2022-10-19 14:24:49.611852', '2022-10-19 14:24:49.630128');
INSERT INTO ttlive.game (id, game_number, state, is_doubles, set1, set2, set3, set4, set5, home_sets, guest_sets, match_id, home_player_id, guest_player_id, home_doubles_id, guest_doubles_id, created_at, modified_at) VALUES
 (14, 4, 'FINISHED', false, '8:11', '10:12', '10:12', NULL, NULL,0,3, 2, 10, 13, NULL, NULL, '2022-10-19 14:24:49.614918', '2022-10-19 14:24:49.633095');
INSERT INTO ttlive.game (id, game_number, state, is_doubles, set1, set2, set3, set4, set5, home_sets, guest_sets, match_id, home_player_id, guest_player_id, home_doubles_id, guest_doubles_id, created_at, modified_at) VALUES
 (15, 5, 'LIVE', false, '11:4', '11:9', '13:15', '11:7', NULL,3,1, 2, 11, 16, NULL, NULL, '2022-10-19 14:24:49.61754', '2022-10-19 14:24:49.633946');
INSERT INTO ttlive.game (id, game_number, state, is_doubles, set1, set2, set3, set4, set5, home_sets, guest_sets, match_id, home_player_id, guest_player_id, home_doubles_id, guest_doubles_id, created_at, modified_at) VALUES 
(16, 6, 'NOT_STARTED', false, NULL, NULL, NULL, NULL, NULL, 0,0,2, 12, 15, NULL, NULL, '2022-10-19 14:24:49.619962', '2022-10-19 14:24:49.634514');
INSERT INTO ttlive.game (id, game_number, state, is_doubles, set1, set2, set3, set4, set5, home_sets, guest_sets, match_id, home_player_id, guest_player_id, home_doubles_id, guest_doubles_id, created_at, modified_at) VALUES 
(17, 7, 'NOT_STARTED', false, NULL, NULL, NULL, NULL, NULL, 0,0,2, 9, 13, NULL, NULL, '2022-10-19 14:24:49.620794', '2022-10-19 14:24:49.635059');
INSERT INTO ttlive.game (id, game_number, state, is_doubles, set1, set2, set3, set4, set5, home_sets, guest_sets, match_id, home_player_id, guest_player_id, home_doubles_id, guest_doubles_id, created_at, modified_at) VALUES
 (18, 8, 'NOT_STARTED', false, NULL, NULL, NULL, NULL, NULL, 0,0,2, 10, 14, NULL, NULL, '2022-10-19 14:24:49.621723', '2022-10-19 14:24:49.63563');
INSERT INTO ttlive.game (id, game_number, state, is_doubles, set1, set2, set3, set4, set5, home_sets, guest_sets, match_id, home_player_id, guest_player_id, home_doubles_id, guest_doubles_id, created_at, modified_at) VALUES 
(19, 9, 'NOT_STARTED', false, NULL, NULL, NULL, NULL, NULL, 0,0,2, 11, 15, NULL, NULL, '2022-10-19 14:24:49.62257', '2022-10-19 14:24:49.636178');
INSERT INTO ttlive.game (id, game_number, state, is_doubles, set1, set2, set3, set4, set5, home_sets, guest_sets, match_id, home_player_id, guest_player_id, home_doubles_id, guest_doubles_id, created_at, modified_at) VALUES 
(20, 10, 'NOT_STARTED', false, NULL, NULL, NULL, NULL, NULL, 0,0,2, 12, 16, NULL, NULL, '2022-10-19 14:24:49.623375', '2022-10-19 14:24:49.636627');

INSERT INTO ttlive.match (id, state, title, description, home_team_score, guest_team_score, editorcode, code, league_id, home_team_id, guest_team_id, game_style_id, account_id, created_at, modified_at, start_date) 
VALUES (3, 'FINISHED', '', '', 3, 4, 'mon6p7', 'ppins9', 1, 5, 4, 1, NULL, '2022-10-19 14:25:34.880507', '2022-10-19 14:30:00', '2022-10-19 13:30:00');


INSERT INTO ttlive.doubles (id, "position", is_home_team, player_1, player_2, match_id) VALUES (9, 1, true, 'Trinh Antonio', 'Zeyn Timo', 3);
INSERT INTO ttlive.doubles (id, "position", is_home_team, player_1, player_2, match_id) VALUES (10, 1, false, 'Gez Richard', 'Ptach Sven', 3);
INSERT INTO ttlive.doubles (id, "position", is_home_team, player_1, player_2, match_id) VALUES (11, 2, true, 'Ott Thomas', 'Hoffmann Frank', 3);
INSERT INTO ttlive.doubles (id, "position", is_home_team, player_1, player_2, match_id) VALUES (12, 2, false, 'Gernhardt Oliver', 'Skibbe Florian', 3);


INSERT INTO ttlive.player (id, name, "position", is_home_team, created_at, modified_at, match_id) VALUES (17, 'Trinh Antonio', 1, true, '2022-10-19 14:25:34.892648', '2022-10-19 14:25:34.892672', 3);
INSERT INTO ttlive.player (id, name, "position", is_home_team, created_at, modified_at, match_id) VALUES (18, 'Gez Richard', 2, true, '2022-10-19 14:25:34.894416', '2022-10-19 14:25:34.894437', 3);
INSERT INTO ttlive.player (id, name, "position", is_home_team, created_at, modified_at, match_id) VALUES (19, 'Zeyn Timo', 3, true, '2022-10-19 14:25:34.896205', '2022-10-19 14:25:34.896225', 3);
INSERT INTO ttlive.player (id, name, "position", is_home_team, created_at, modified_at, match_id) VALUES (20, 'Wegner Christian', 4, true, '2022-10-19 14:25:34.897818', '2022-10-19 14:25:34.897839', 3);
INSERT INTO ttlive.player (id, name, "position", is_home_team, created_at, modified_at, match_id) VALUES (21, 'Ott Thomas', 1, false, '2022-10-19 14:25:34.901912', '2022-10-19 14:25:34.901928', 3);
INSERT INTO ttlive.player (id, name, "position", is_home_team, created_at, modified_at, match_id) VALUES (22, 'Gernhardt Oliver', 2, false, '2022-10-19 14:25:34.902574', '2022-10-19 14:25:34.902593', 3);
INSERT INTO ttlive.player (id, name, "position", is_home_team, created_at, modified_at, match_id) VALUES (23, 'Skibbe Florian', 3, false, '2022-10-19 14:25:34.903394', '2022-10-19 14:25:34.903411', 3);
INSERT INTO ttlive.player (id, name, "position", is_home_team, created_at, modified_at, match_id) VALUES (24, 'Düvell Mirko', 4, false, '2022-10-19 14:25:34.904027', '2022-10-19 14:25:34.904044', 3);



INSERT INTO ttlive.game (id, game_number, state, is_doubles, set1, set2, set3, set4, set5, home_sets, guest_sets, match_id, home_player_id, guest_player_id, home_doubles_id, guest_doubles_id, created_at, modified_at) VALUES 
(21, 1, 'FINISHED', true, '9:11', '8:11', '8:11',NULL, NULL, 0, 3, 3, NULL, NULL, 9, 10, '2022-10-19 14:25:34.888085', '2022-10-19 14:25:34.88811');
INSERT INTO ttlive.game (id, game_number, state, is_doubles, set1, set2, set3, set4, set5, home_sets, guest_sets, match_id, home_player_id, guest_player_id, home_doubles_id, guest_doubles_id, created_at, modified_at) VALUES 
(22, 2, 'FINISHED', true, '11:5', '8:11', '5:11', '1:11', NULL, 1,3,3, NULL, NULL, 11, 12, '2022-10-19 14:25:34.891356', '2022-10-19 14:25:34.891384');
INSERT INTO ttlive.game (id, game_number, state, is_doubles, set1, set2, set3, set4, set5, home_sets, guest_sets, match_id, home_player_id, guest_player_id, home_doubles_id, guest_doubles_id, created_at, modified_at) VALUES 
(23, 3, 'FINISHED', false, '11:6', '11:5', '11:7', NULL, NULL, 3,0,3, 17, 22, NULL, NULL, '2022-10-19 14:25:34.893641', '2022-10-19 14:25:34.908147');
INSERT INTO ttlive.game (id, game_number, state, is_doubles, set1, set2, set3, set4, set5, home_sets, guest_sets, match_id, home_player_id, guest_player_id, home_doubles_id, guest_doubles_id, created_at, modified_at) VALUES
 (24, 4, 'FINISHED', false, '9:11', '9:11', '11:5', '7:11', NULL, 1,3,3, 18, 21, NULL, NULL, '2022-10-19 14:25:34.895262', '2022-10-19 14:25:34.90891');
INSERT INTO ttlive.game (id, game_number, state, is_doubles, set1, set2, set3, set4, set5, home_sets, guest_sets, match_id, home_player_id, guest_player_id, home_doubles_id, guest_doubles_id, created_at, modified_at) VALUES
 (25, 5, 'LIVE', false, '15:13', '9:11', '3:11', '7:11', NULL, 1,3,3, 19, 24, NULL, NULL, '2022-10-19 14:25:34.896996', '2022-10-19 14:25:34.909432');
INSERT INTO ttlive.game (id, game_number, state, is_doubles, set1, set2, set3, set4, set5, home_sets, guest_sets, match_id, home_player_id, guest_player_id, home_doubles_id, guest_doubles_id, created_at, modified_at) VALUES 
(26, 6, 'FINISHED', false, '10:12', '9:11', '11:9', '11:9', '14:12',3,2, 3, 20, 23, NULL, NULL, '2022-10-19 14:25:34.89845', '2022-10-19 14:25:34.909864');
INSERT INTO ttlive.game (id, game_number, state, is_doubles, set1, set2, set3, set4, set5, home_sets, guest_sets, match_id, home_player_id, guest_player_id, home_doubles_id, guest_doubles_id, created_at, modified_at) VALUES
 (27, 7, 'LIVE', false, '11:7', '6:11', '11:7', '10:12', '14:12', 3,2,3, 17, 21, NULL, NULL, '2022-10-19 14:25:34.899124', '2022-10-19 14:25:34.911156');
INSERT INTO ttlive.game (id, game_number, state, is_doubles, set1, set2, set3, set4, set5, home_sets, guest_sets, match_id, home_player_id, guest_player_id, home_doubles_id, guest_doubles_id, created_at, modified_at) VALUES 
(28, 8, 'NOT_STARTED', false, NULL, NULL, NULL, NULL, NULL,0,0, 3, 18, 22, NULL, NULL, '2022-10-19 14:25:34.899975', '2022-10-19 14:25:34.913396');
INSERT INTO ttlive.game (id, game_number, state, is_doubles, set1, set2, set3, set4, set5, home_sets, guest_sets, match_id, home_player_id, guest_player_id, home_doubles_id, guest_doubles_id, created_at, modified_at) VALUES
 (29, 9, 'NOT_STARTED', false, NULL, NULL, NULL, NULL, NULL,0,0, 3, 19, 23, NULL, NULL, '2022-10-19 14:25:34.900618', '2022-10-19 14:25:34.913988');
INSERT INTO ttlive.game (id, game_number, state, is_doubles, set1, set2, set3, set4, set5, home_sets, guest_sets, match_id, home_player_id, guest_player_id, home_doubles_id, guest_doubles_id, created_at, modified_at) VALUES 
(30, 10, 'NOT_STARTED', false, NULL, NULL, NULL, NULL, NULL, 0,0,3, 20, 24, NULL, NULL, '2022-10-19 14:25:34.901263', '2022-10-19 14:25:34.914505');



SELECT pg_catalog.setval('ttlive.doubles_id_seq', 12, true);
SELECT pg_catalog.setval('ttlive.game_id_seq', 30, true);
SELECT pg_catalog.setval('ttlive.match_id_seq', 3, true);
SELECT pg_catalog.setval('ttlive.player_id_seq', 24, true);



