import { Action, State, StateContext } from '@ngxs/store';
import { AppStateModel } from './interfaces/app-state-model.interface';
import { SetStarships } from './actions/set-starships.action';
import { SetCreatures } from './actions/set-creatures.action';
import { SetPlayedStarships } from './actions/set-played-starships.action';
import { SetPlayedCreatures } from './actions/set-played-creatures.action';
import { ClearPlayed } from './actions/clear-played.action';

@State<AppStateModel>({
  name: 'app',
  defaults: {
    starships: [],
    creatures: [],
    playedStarships: [],
    playedCreatures: []
  }
})
export class AppState {
  @Action(SetStarships)
  setStarships(ctx: StateContext<AppStateModel>, action: SetStarships) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      starships: action.starships
    });
  }

  @Action(SetCreatures)
  setCreatures(ctx: StateContext<AppStateModel>, action: SetCreatures) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      creatures: action.creatures
    });
  }

  @Action(SetPlayedStarships)
  setPlayedStarships(ctx: StateContext<AppStateModel>, action: SetPlayedStarships) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      playedStarships: action.playedStarships
    });
  }

  @Action(SetPlayedCreatures)
  setPlayedCreatures(ctx: StateContext<AppStateModel>, action: SetPlayedCreatures) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      playedCreatures: action.playedCreatures
    });
  }

  @Action(ClearPlayed)
  clearPlayed(ctx: StateContext<AppStateModel>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      playedStarships: [],
      playedCreatures: []
    });
  }
}
