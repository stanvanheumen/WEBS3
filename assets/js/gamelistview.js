function GameListView(app) {
    this.app = app;
}

GameListView.prototype = {
    init: function() {
        $('#gamelist').hide();

        this.app.requestGameList();

        this.bindListeners();
    },

    bindListeners: function() {
        $('#newgame').click( $.proxy(this.onNewGameClick, this) );
        $('#removegames').click( $.proxy(this.onRemoveGamesClick, this) );
    },

    onNewGameClick: function(event) {
        this.app.requestNewGame();
    },

    onRemoveGamesClick: function(event) {
        this.app.removeGames();
    },

    onGamesRemoved: function() {
        alert("De gamelijst is leeggemaakt");
        this.app.requestGameList();
    },

    onGameCreated: function(game) {
        if(game.msg && game.msg.indexOf('Error') == 0) {
            alert("Er is al een game aangemaakt.");
            return;
        }

        this.app.requestGameList();
    },

    onGameListReceived: function(gameList) {
        console.log('gamelist received');

        var table = $('#gamelist');
        table.empty();
        table.append('<tr><th>Id</th><th>Status</th><th>Enemy Name</th></tr>');

        for(var i = 0; i < gameList.getGames().length; i++) {
            var row = $('<tr></tr>');
            var game = gameList.getGames()[i];
            if(game.getStatus() == 'que') {
                row.append('<td>' + game.getId() + '</td>');
                row.append('<td>' + game.getStatus() + '</td>');
                table.append(row);
            } else if(game.getStatus() == 'setup') {
                row.append('<td>' + game.getId() + '</td>');
                row.append('<td>' + game.getStatus() + '</td>');
                row.append('<td>' + game.getEnemyName() + '</td>');
                table.append(row);
            }
        }

        table.show();
    }
}