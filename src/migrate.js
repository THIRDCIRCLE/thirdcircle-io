import { __awaiter } from "tslib";
import { ThirdCircleIoApplication } from './application';
export function migrate(args) {
    return __awaiter(this, void 0, void 0, function* () {
        const app = new ThirdCircleIoApplication();
        yield app.boot();
        // Connectors usually keep a pool of opened connections,
        // this keeps the process running even after all work is done.
        // We need to exit explicitly.
        process.exit(0);
    });
}
migrate(process.argv).catch(err => {
    console.error('Cannot migrate database schema', err);
    process.exit(1);
});
//# sourceMappingURL=migrate.js.map