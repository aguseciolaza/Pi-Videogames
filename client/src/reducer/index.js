import { GET_ALL_VIDEOGAMES , GET_ALL_GENRES, FILTER_BY_CREATED, FILTER_BY_GENRE, SORT_BY_NAME,SORT_BY_RATING, SEARCH_GAME, POST_VIDEOGAME, GET_VIDEOGAME_ID, CLEAN_DETAIL, REFRESH, CLEAR_VIDEOGAMES} from "../actions";

const initialState = {
    videogames: [],
    allVideogames: [],
    genres: [],
    videogameDetail: {},
    platforms: ["PC", "PlayStation 5", "PlayStation 4", "Xbox One", "Xbox Series S/X", "Nintendo Switch", "iOS", "Android", "Nintendo 3DS", "macOS", "Xbox 360", "Xbox", "PlayStation 3", "PlayStation 2", "Wii U", "Nintendo 64", "Game Boy Advance", "Game Boy Color", "Game Boy", "GameCube"]
  }
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_VIDEOGAMES:
          return {
            ...state,
            videogames: action.payload,
            allVideogames: action.payload
          }
          case GET_ALL_GENRES:
            return {
              ...state,
              genres: action.payload,
            }
            case FILTER_BY_CREATED:
              const allVideogames = state.allVideogames ;
              const filteredGames = action.payload == 'db'? allVideogames.filter(g => g.createdInDb == 'db') : allVideogames.filter(g => g.createdInDb == 'api')
              return {
                ...state,
                videogames: filteredGames
              }
              case FILTER_BY_GENRE:
                const allVideogames2 = state.allVideogames ;
                const filteredGenre = allVideogames2.filter(g => g.genres.includes(action.payload)) 
                return {
                  ...state,
                  videogames: filteredGenre
                }
                case SORT_BY_RATING:
                  let sortRating = action.payload === 'ascRating' ?
                  state.videogames.sort((a,b) => { //pongo el state antes sino estoy agarrando las variables de arriba
                    if (a.rating > b.rating) {return 1 }
                    if (a.rating < b.rating) {return -1}
                    return 0 ;
                  }) :
                  state.videogames.sort((a,b) => {
                    if (a.rating > b.rating) {return -1}
                    if (a.rating < b.rating) {return 1}
                    return 0 ;
                  })
                  return {
                    ...state,
                    videogames: sortRating
                  }
                  case SORT_BY_NAME:
                    let sortName = action.payload === 'ascName' ?
                    state.videogames.sort((a,b) => {
                      if (a.name > b.name) {return 1}
                      if (a.name < b.name) {return -1}
                      return 0;
                    }) :
                    state.videogames.sort((a,b) => {
                      if (a.name > b.name) {return -1}
                      if (a.name < b.name) {return 1}
                      return 0;
                    })
                    return {
                      ...state,
                      videogames: sortName
                    }
                    case SEARCH_GAME:
                      return {
                        ...state,
                        videogames: action.payload
                      }
                      case POST_VIDEOGAME:
                        return {
                          ...state
                        }
                        case GET_VIDEOGAME_ID:
                          return {
                            ...state,
                            videogameDetail: action.payload
                          }
                          case CLEAN_DETAIL:
                            return{
                              ...state,
                              videogameDetail: {}
                            }
                            case REFRESH:
                              const videogamesRefresh = state.allVideogames;
                              return{
                                ...state,
                                videogames: videogamesRefresh
                              }
                              case CLEAR_VIDEOGAMES:
                                return{
                                  ...state,
                                  videogames: []
                                }
                              
      default:
        return state;
    }
  };
  
  export default rootReducer;