// Re-eksportowanie funkcji z dictionaryApi, aby zachować spójność importów
import {
  getBoatRanges,
  getBoatModels,
  getChangeTypes,
  getChangeReasons,
} from './dictionaryApi';

export {
  getBoatRanges,
  getBoatModels,
  getChangeTypes,
  getChangeReasons,
};
