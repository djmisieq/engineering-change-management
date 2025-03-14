import { addVoteForChange, completeVoting, cancelVoting } from './mockApi';

/**
 * Serwis do obsługi głosowania w Product Council
 */

// Stałe - ID aktualnego użytkownika (tymczasowe, docelowo z systemu autoryzacji)
const CURRENT_USER_ID = 'user-current';
const CURRENT_USER_NAME = 'John Doe';

/**
 * Głosowanie za zmianą
 * @param changeId ID zmiany inżynieryjnej
 * @param decision Decyzja (Yes/No)
 * @param comments Opcjonalny komentarz do głosu
 */
export const voteForChange = async (
  changeId: string, 
  decision: 'yes' | 'no', 
  comments?: string
) => {
  try {
    const voteDecision = decision === 'yes' ? 'Yes' : 'No';
    const result = await addVoteForChange(
      changeId,
      CURRENT_USER_ID,
      CURRENT_USER_NAME,
      voteDecision,
      comments
    );
    
    return result;
  } catch (error) {
    console.error('Error voting for change:', error);
    throw error;
  }
};

/**
 * Zakończenie procesu głosowania
 * @param changeId ID zmiany inżynieryjnej
 */
export const finishVoting = async (changeId: string) => {
  try {
    const result = await completeVoting(changeId);
    return result;
  } catch (error) {
    console.error('Error finishing voting process:', error);
    throw error;
  }
};

/**
 * Anulowanie procesu głosowania
 * @param changeId ID zmiany inżynieryjnej
 */
export const cancelVotingProcess = async (changeId: string) => {
  try {
    const result = await cancelVoting(changeId);
    return result;
  } catch (error) {
    console.error('Error canceling voting process:', error);
    throw error;
  }
};

/**
 * Sprawdzenie czy bieżący użytkownik już głosował
 * @param changeId ID zmiany inżynieryjnej
 * @param votes Lista głosów
 */
export const hasUserVoted = (
  votes?: { userId: string; decision: 'Yes' | 'No' }[]
) => {
  if (!votes || votes.length === 0) return false;
  return votes.some(vote => vote.userId === CURRENT_USER_ID);
};

/**
 * Pobranie głosu aktualnego użytkownika
 * @param votes Lista głosów
 */
export const getCurrentUserVote = (
  votes?: { userId: string; decision: 'Yes' | 'No' }[]
) => {
  if (!votes || votes.length === 0) return null;
  return votes.find(vote => vote.userId === CURRENT_USER_ID) || null;
};