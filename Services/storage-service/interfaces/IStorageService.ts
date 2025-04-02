export interface IStorageService {
    /**
     * Loads a variable from storage.
     * Returns 'undefined' if the variable doesn't exist.
     * @param variable 
     */
    loadVariable(variable: string):string;
    setVariable(variable: string, value: String): void;

}