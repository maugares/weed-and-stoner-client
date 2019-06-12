import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getGames, joinGame, updateGame } from '../../actions/games'
import { getUsers } from '../../actions/users'
import { userId } from '../../jwt'
import Paper from '@material-ui/core/Paper'
import Board from './Board'
import './GameDetails.css'
import { findX, findO } from './Validation'

class GameDetails extends PureComponent {

  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.game === null) this.props.getGames()
      if (this.props.users === null) this.props.getUsers()
    }
  }

  joinGame = () => this.props.joinGame(this.props.game.id)

  makeMove = (toRow, toCell) => {
    const { game, updateGame, userId } = this.props
    const nX = findX(game.board).arrX.length
    const nY = findO(game.board).arrX.length

    if (userId === 1) {
      game.clickedCell = `${toRow}-${toCell}`
      game.nX = nX
      updateGame(game.id, game)
    } else if (userId === 2) {
      game.clickedCell = `${toRow}-${toCell}`
      game.nY = nY
      updateGame(game.id, game)
    }
  }


  render() {
    const { game, users, authenticated, userId } = this.props

    const userRole = userId === 1 ? 'Weed' : "Stoner"

    if (!authenticated) return (
      <Redirect to="/login" />
    )

    if (game === null || users === null) return 'Loading...'
    if (!game) return 'Not found'

    const player = game.players.find(p => p.userId === userId)

    const winner = game.players
      .filter(p => p.symbol === game.winner)
      .map(p => p.userId)[0]

    const message = () => {
      if (userId === 1) {
        if (game.played1 === 0) {
          return 'Pick a possible tile (translucid ones)'
        } else {
          return `Waiting for opponent`
        }
      } else if (userId === 2) {
        if (game.played2 === 0) {
          return 'Pick a possible tile (translucid ones)'
        } else {
          return `Waiting for opponent`
        }
      }
    }

    return (<Paper className="outer-paper">
      <h1>Game #{game.id}</h1>

      <p>Role: {userRole}</p>

      {
        game.status === 'started' &&
        player && player.symbol === game.turn &&
        <div>It's your turn!</div>
      }
      {
        game.status === 'pending' &&
        game.players.map(p => p.userId).indexOf(userId) === -1 &&
        <button onClick={this.joinGame}>Join Game</button>
      }
      {
        winner &&
        <p>Winner: {users[winner].firstName}</p>
      }
      <hr />
      <div class='board-container'>
        <div class='board'>
          {
            game.status !== 'pending' &&
            <Board game={game} makeMove={this.makeMove} />
          }
        </div>
      </div>
      <p>{message()}</p>

      <div class='score-board'>
        <div class='player-container'>
          <div class='player'>Weed</div>
          <div class='points'>{game.points1}</div>
        </div>
        <div>
          <div class='player'>Stoner</div>
          <div class='points'>{game.points2}</div>
        </div>
      </div>
    </Paper>)
  }
}
const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  userId: state.currentUser && userId(state.currentUser.jwt),
  game: state.games && state.games[props.match.params.id],
  users: state.users
})
const mapDispatchToProps = {
  getGames, getUsers, joinGame, updateGame
}
export default connect(mapStateToProps, mapDispatchToProps)(GameDetails)
