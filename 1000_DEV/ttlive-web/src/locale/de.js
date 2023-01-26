const deDe = {
    de: {
        translation: {
            "Common.error": "Fehler",
            "Common.ok": "OK",
            "Common.errorFetch": "Leider kann der Server nicht erreicht werden. Bitte versuchen sie es später noch einmal",
            "Common.reset": "Reset",
            "Common.close": "Schließen",
            "Common.delete": "Löschen",

            "MenuBar.home": "Home",
            "MenuBar.live": "Live",
            "MenuBar.games": "Spiele",

            "LoginForm.login": "Login",
            "LoginForm.register": "Registrieren",
            "LoginForm.username": "Username",
            "LoginForm.password": "Passwort",
            "LoginForm.logout": "Logout",
            "LoginForm.errorUsernameEmpty": "Username darf nicht leer sein",
            "LoginForm.errorPasswordEmpty": "Passwort darf nicht leer sein",
            "LoginForm.errorWrongUsername": "Username konnte nicht gefunden werden",
            "LoginForm.errorWrongPassword": "Ungültiges Passwort",
            "LoginForm.errorNotAuthenticated": "Account ist noch nicht verifiziert. Eine Verifikations Email wurde verwendet.",
            "LoginForm.errorPost": "Es ist ein Fehler aufgetreten. Bitte versuchen sie es später erneut.",

            "HomeView.welcomeText": "<strong>TT-Live</strong>, die Tischtennis Liveticker App",
            "HomeView.search": "Spielsuche",
            "HomeView.createMatch": "Livegame Erstellen",
            "HomeView.goLiveText": "Gehe Live mit deinem Ligaspiel\nohne Account und in nur wenigen Klicks.",
            "HomeView.goSearchText": "... oder finde ein live Spiel über die Suche.",
            "HomeView.imprint": "Impressum",

            "CreateGameView.stepRegion": "Region/Konkurenz",
            "CreateGameView.stepLeague": "Liga/Spielsystem",
            "CreateGameView.stepHomeTeam": "Heimmanschaft",
            "CreateGameView.stepGuestTeam": "Gastmannschaft",
            "CreateGameView.stepLogin": "Account verknüpfen",
            "CreateGameView.stepSummary": "Übersicht",
            "CreateGameView.next": "Weiter",
            "CreateGameView.nextNoAccount": "Weiter ohne Account",
            "CreateGameView.submit": "Erstellen",
            "CreateGameView.back": "Zurück",
            "CreateGameView.createError": "Leider ist ein Fehler aufgetreten und das Match konnte nicht erstellt werden.\nBitte versuchen sie es später erneut.",

            "RegionState.region": "Verband",
            "RegionState.contest": "Konkurrenz",
            "RegionState.contestMen": "Herren",
            "RegionState.contestWomen": "Damen",
            "RegionState.errorEmptyRegion": "Region muss gesetzt werden",
            "RegionState.errorEmptyContest": "Konkurrenz muss gesetzt werden",

            "LeagueState.league": "Liga",
            "LeagueState.gameStyle": "Spielsystem",
            "LeagueState.gameStyleDesc": "Spielsystem:",
            "LeagueState.startDate": "Spielbeginn",
            "LeagueState.errorInvalidGameStyle": "Spielsystem konnte nicht ausgewählt werden",
            "LeagueState.errorEmptyGameStyle": "Spielsystem ist leer",
            "LeagueState.errorEmptyLeague": "Liga ist leer",
            "LeagueState.errorEmptyStartDate": "Spielbeginn ist leer",
            "LeagueState.errorInvalidStartDate": "Ungültiges Datumsformat",
            "LeagueState.errorRegion": "Es muss zunächst ein Verband ausgewählt werden.",
            "LeagueState.errorContest": "Es muss zunächst eine Konkurrenz ausgewählt werden.",

            "TeamState.homeTeam": "Heimverein",
            "TeamState.guestTeam": "Gastverein",
            "TeamState.number": "Mannschaft Nr.",
            "TeamState.errorGameStyle": "Es muss zunächst ein Spielsystem ausgewählt werden",
            "TeamState.errorLeague": "Es muss zunächst eine Liga ausgewählt werden",
            "TeamState.errorEmptyClub": "Verein muss gesetzt werden",
            "TeamState.errorEmptyNumber": "Mannschaft muss gesetzt werden",
            "TeamState.errorGameState": "Es nuss zunächst ein Spielsystem gesetzt werden",

            "SummaryState.region": "Verband:",
            "SummaryState.contest": "Konkurrenz:",
            "SummaryState.league": "Liga:",
            "SummaryState.gameStyle": "Spielsystem:",
            "SummaryState.guestTeam": "Gastmanschaft:",
            "SummaryState.homeTeam": "Heimmanschaft:",
            "SummaryState.startDate": "Spielbeginn:",

            "LoginState.description": "Melde dich an um das Spiel mit deinem Account zu verknüpfen. "
                + "Nicht verknüpfte Spiele...",
            "LoginState.deleted": "werden nach <strong>48h gelöscht</strong>.",
            "LoginState.notSearchable": "sind nicht öffentlich und tauchen <strong>nicht in der Spielsuche auf</strong>.",

            "LiveSearch.headline": "Alle Spiele im Überblick",
            "LiveSearch.region": "Verband",
            "LiveSearch.league": "Liga",
            "LiveSearch.homeTeam": "Heim",
            "LiveSearch.guestTeam": "Gast",

            "LiveView.noMatch": "Kein Livespiel ausgewählt.\nFinde ein Spiel über die Suche",
            "LiveView.search": "Zur Suche",
            "LiveView.live": "Live",
            "LiveView.lineup": "Spielbericht",
            "LiveView.settings": "Settings",
            "LiveView.notStartedText": "Spielbeginn",
            "LiveView.missingLineup": "Aufstellung unvollständig",
            "LiveView.fix": "beheben",

            "MatchStateLabel.live": "Live",
            "MatchStateLabel.yesterday": "Gestern",

            "MatchCard.linkGame": "zum Spiel",

            "GameReport.singles": "Einzel",
            "GameReport.doubles": "Doppel",
            "GameReport.lastDouble": "Schlussdoppel",
            "GameReport.noPlayer": "Nicht eingegeben",
            "GameReport.set": "Nur Sätze",
            "GameReport.points": "Punkte",
            "GameReport.edit": "Editieren?",
            "GameReport.inputType": "Eingabeform",

            "CodeSetting.editorCode": "Editor-Code",
            "CodeSetting.description": "Dieser Code ermöglicht es anderen zu Editoren zu werden.",


            "MatchSettings.noCodeHeader": "Du bist <strong style='color=\"red\"'>kein</strong> Editor!",
            "MatchSettings.noCodeText": "Gib den Editor-Code ein um einer zu werden.\nAndere Editoren oder der Spielersteller besitzen den Code.",
            "MatchSettings.editorCodeInput": "Editor-Code",
            "MatchSettings.noCodeButton": "Bestätigen",
            "MatchSettings.errorValidatingCode": "Es ist ein Fehler beim überprüfen des Codes aufgetreten. Bitte versuchen sie es später erneut",
            "MatchSettings.errorInvalidCode": "Fehlerhafter Code",

            "LineupSetting.double": "Doppel",
            "LineupSetting.player": "Spieler",
            "LineupSetting.homeTeam": "Aufstellung Heimverein",
            "LineupSetting.guestTeam": "Aufstellung Gastverein",

            "MatchInfoEdit.title": "Spielinfo",
            "MatchInfoEdit.homeTeamName": "Heimverein",
            "MatchInfoEdit.guestTeamName": "Gastverein",
            "MatchInfoEdit.teamNumber": "Nr.",
            "MatchInfoEdit.league": "Liga",
            "MatchInfoEdit.startDate": "Spielbeginn",
            "MatchInfoEdit.common": "Allgemein",

            "AccountSetting.title": "Account Verknüpfen",
            "AccountSetting.notConnected": "Match nicht verknüpft",
            "AccountSetting.confirm": "Mit diesem Account Verknüpfen",
            "AccountSetting.putError": "Es ist ein Fehler aufgetreten. Bitte versuchen sie es später erneut",
            "AccountSetting.confirm.title": "Wirklich Verknüpfen?",
            "AccountSetting.confirm.text": "Diese Aktion ist <strong>unumkehrbar</strong>. "
                + "Ein Match kann nur mit <strong>einem</strong> Account verknüpft werden.",
            "AccountSetting.confirm.connect": "Verknüpfen",
            "AccountSetting.confirm.cancel": "Abbrechen",

            "DeleteMatchSetting.title": "Match Löschen",
            "DeleteMatchSetting.deletable": "Gebe <strong>löschen</strong> ein, um das Spiel zu löschen.\nDiese Aktion ist unumkehrbar.",
            "DeleteMatchSetting.notDeletableAccount": "Löschen des Spieles nicht möglich.\nNur der inhaber kann das Spiel löschen \nInhaber:",
            "DeleteMatchSetting.notDeletableEditor": "Löschen des Spieles nicht möglich.\nNur Editoren kann das Spiel löschen",
            "DeleteMatchSetting.inputError": "Falsche Eingabe. Geben sie 'löschen' ein",
            "DeleteMatchSetting.deleteError": "Leider ist ein Fehler aufgetreten, Bitte versuchen sie es später erneut.",

            "ChatDrawer.send": "Senden",
            "ChatDrawer.username": "Username",
            "ChatDrawer.save": "OK",

            "ShareButton.copyLink": "Link zum Spiel kopiert",

            "GameLiveEdit.set": "Satz",

            "GameSetResult.isHome": "Heim?",
            "GameSetResult.unset": "0:0?",

            "ImprintView.imprint": "Impressum:",
            "ImprintView.contact": "Kontaktaufnahme:",

            "MatchFilter.showUpcoming": "Upcoming?",
            "MatchFilter.showLive": "Live?",
            "MatchFilter.showFinished": "Beendet?",
            "MatchFilter.emptyContest": "Alle",
            "MatchFilter.club": "Mannschaft",
            "MatchFilter.league": "Liga",
            "MatchFilter.contestWomen": "Damen",
            "MatchFilter.contestMen": "Herren",
            "MatchFilter.contest": "Konkurrenz",
            "MatchFilter.region": "Region",

            "ContactForm.header": "Kontakt",
            "ContactForm.introduction": "Moin,\n"
                + "TT-Live ist ein kleine Projekt, welches ich in meiner Freizeit neben meinem Studium entwickel.\n"
                + "Hast du Feedback, Verbesserungsvorschläge oder\n"
                + "sind Fehler aufgetreten, lassen sie es mich gerne wissen.",
            "ContactForm.text": "Deine Nachricht",
            "ContactForm.recipient": "Email (otional)",
            "ContactForm.submit": "Senden",
            "ContactForm.confirmTitle": "Erfolgreich",
            "ContactForm.confirmText": "Deome Nachricht wurde erfolgreich versendet.\nVielen Dank für ihr Feedback.",
            "ContactForm.errorTextLength": "Der Text darf nur maximal 4096 Zeichen umfassen",
            "ContactForm.errorTextEmpty": "Sie müssen schon etwas schreiben",
            "ContactForm.errorRecipientLength": "Maximale länge 265 Zeichn",
            "ContactForm.errorPost": "Leider ist ein Fehler aufgetreten, bitte versuchen sie es später erneut.",

            "RegisterView.title": "Registrieren",
            "RegisterView.registeredTitl": "Registrieren",
            "RegisterView.username": "Username",
            "RegisterView.password": "Password",
            "RegisterView.passwordConfirm": "Password bestätigen",
            "RegisterView.email": "Email",
            "RegisterView.register": "Registrieren",
            "RegisterView.errorUsernameEmpty": "Username darf nicht leer sein",
            "RegisterView.errorPost": "Leider ist ein Fehler aufgetreten, bitte versuchen sie es später erneut.",
            "RegisterView.errorUernameTaken": "Der Benutzername existiert bereits",
            "RegisterView.errorPasswordsEmpty": "Passwort darf nicht leer sein",
            "RegisterView.errorPasswordNotEqual": "Die Passwörter stimmen nicht überein",
            "RegisterView.errorEmailEmpty": "Email darf nicht leer sein",
            "RegisterView.errorEmailValidation": "Email ist im falschen Format",
            "RegisterView.registeredTitle": "Registrierung Erfolgreich",
            "RegisterView.registeredText": "Dein Account wurde erfolgreich erstellt.\nDu kannst dich jetzt über den Login anmelden.",
            "RegisterView.toLogin": "Zum Login"
        }
    }
}

export default deDe;