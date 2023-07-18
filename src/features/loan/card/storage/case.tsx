
import LOANCardLegalStorageCase from "./legal/case";
import { LOANCardProductStorageCase } from "./products/case";

const StorageCase = {
    ...LOANCardProductStorageCase,
    ...LOANCardLegalStorageCase,
}

export default StorageCase;