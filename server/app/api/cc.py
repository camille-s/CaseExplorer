from flask import request
from flask_accepts import accepts
from flask_restx import Namespace, Resource

from .interface import QueryParams
from ..models import CC
from ..service import DataService
from ..utils import get_eager_query, db_session

def api_factory(schemas):
    api = Namespace('CC', description='Circuit Court Civil Cases')

    cc_schema = schemas['CC']
    cc_schema_full = schemas['CCFull']
    cc_results_schema = schemas['CCResults']

    @api.route('/cc')
    class CCResource(Resource):
        '''CC'''

        @accepts(schema=QueryParams, api=api)
        @api.marshal_with(cc_results_schema)
        def post(self):
            '''Get a list of Circuit Court Civil Cases'''

            return DataService.fetch_rows_orm('cc', request.parsed_obj)

    @api.route('/cc/<string:case_number>')
    class CCResourceCaseNumber(Resource):
        '''CC by case number'''

        @api.marshal_with(cc_schema)
        def get(self, case_number):
            return CC.query.filter(CC.case_number == case_number).one()

    @api.route('/cc/<string:case_number>/full')
    class CCResourceCaseNumberFull(Resource):
        '''CC full case details by case number'''

        @api.marshal_with(cc_schema_full)
        def get(self, case_number):
            return get_eager_query(CC).filter(CC.case_number == case_number).one()

    @api.route('/cc/total')
    class CCTotal(Resource):
        '''Total number of Circuit Court Civil Cases (estimate)'''

        def get(self):
            with db_session() as db:
                results = db.execute("SELECT reltuples FROM pg_class WHERE oid = 'cc'::regclass").scalar()
            return int(results)

    return api
