/**
 * @fileoverview gRPC-Web generated client stub for infer
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.infer = require('./infer_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.infer.InferClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.infer.InferPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.infer.InferRequest,
 *   !proto.infer.InferResponse>}
 */
const methodDescriptor_Infer_Infer = new grpc.web.MethodDescriptor(
  '/infer.Infer/Infer',
  grpc.web.MethodType.UNARY,
  proto.infer.InferRequest,
  proto.infer.InferResponse,
  /**
   * @param {!proto.infer.InferRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.infer.InferResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.infer.InferRequest,
 *   !proto.infer.InferResponse>}
 */
const methodInfo_Infer_Infer = new grpc.web.AbstractClientBase.MethodInfo(
  proto.infer.InferResponse,
  /**
   * @param {!proto.infer.InferRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.infer.InferResponse.deserializeBinary
);


/**
 * @param {!proto.infer.InferRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.infer.InferResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.infer.InferResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.infer.InferClient.prototype.infer =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/infer.Infer/Infer',
      request,
      metadata || {},
      methodDescriptor_Infer_Infer,
      callback);
};


/**
 * @param {!proto.infer.InferRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.infer.InferResponse>}
 *     Promise that resolves to the response
 */
proto.infer.InferPromiseClient.prototype.infer =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/infer.Infer/Infer',
      request,
      metadata || {},
      methodDescriptor_Infer_Infer);
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.infer.ProcessClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.infer.ProcessPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.infer.PreProcessRequest,
 *   !proto.infer.PreProcessResponse>}
 */
const methodDescriptor_Process_PreProcess = new grpc.web.MethodDescriptor(
  '/infer.Process/PreProcess',
  grpc.web.MethodType.UNARY,
  proto.infer.PreProcessRequest,
  proto.infer.PreProcessResponse,
  /**
   * @param {!proto.infer.PreProcessRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.infer.PreProcessResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.infer.PreProcessRequest,
 *   !proto.infer.PreProcessResponse>}
 */
const methodInfo_Process_PreProcess = new grpc.web.AbstractClientBase.MethodInfo(
  proto.infer.PreProcessResponse,
  /**
   * @param {!proto.infer.PreProcessRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.infer.PreProcessResponse.deserializeBinary
);


/**
 * @param {!proto.infer.PreProcessRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.infer.PreProcessResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.infer.PreProcessResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.infer.ProcessClient.prototype.preProcess =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/infer.Process/PreProcess',
      request,
      metadata || {},
      methodDescriptor_Process_PreProcess,
      callback);
};


/**
 * @param {!proto.infer.PreProcessRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.infer.PreProcessResponse>}
 *     Promise that resolves to the response
 */
proto.infer.ProcessPromiseClient.prototype.preProcess =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/infer.Process/PreProcess',
      request,
      metadata || {},
      methodDescriptor_Process_PreProcess);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.infer.PostProcessRequest,
 *   !proto.infer.PostProcessResponse>}
 */
const methodDescriptor_Process_PostProcess = new grpc.web.MethodDescriptor(
  '/infer.Process/PostProcess',
  grpc.web.MethodType.UNARY,
  proto.infer.PostProcessRequest,
  proto.infer.PostProcessResponse,
  /**
   * @param {!proto.infer.PostProcessRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.infer.PostProcessResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.infer.PostProcessRequest,
 *   !proto.infer.PostProcessResponse>}
 */
const methodInfo_Process_PostProcess = new grpc.web.AbstractClientBase.MethodInfo(
  proto.infer.PostProcessResponse,
  /**
   * @param {!proto.infer.PostProcessRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.infer.PostProcessResponse.deserializeBinary
);


/**
 * @param {!proto.infer.PostProcessRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.infer.PostProcessResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.infer.PostProcessResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.infer.ProcessClient.prototype.postProcess =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/infer.Process/PostProcess',
      request,
      metadata || {},
      methodDescriptor_Process_PostProcess,
      callback);
};


/**
 * @param {!proto.infer.PostProcessRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.infer.PostProcessResponse>}
 *     Promise that resolves to the response
 */
proto.infer.ProcessPromiseClient.prototype.postProcess =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/infer.Process/PostProcess',
      request,
      metadata || {},
      methodDescriptor_Process_PostProcess);
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.infer.WebClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.infer.WebPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.infer.WebRequest,
 *   !proto.infer.WebResponse>}
 */
const methodDescriptor_Web_Process = new grpc.web.MethodDescriptor(
  '/infer.Web/Process',
  grpc.web.MethodType.UNARY,
  proto.infer.WebRequest,
  proto.infer.WebResponse,
  /**
   * @param {!proto.infer.WebRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.infer.WebResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.infer.WebRequest,
 *   !proto.infer.WebResponse>}
 */
const methodInfo_Web_Process = new grpc.web.AbstractClientBase.MethodInfo(
  proto.infer.WebResponse,
  /**
   * @param {!proto.infer.WebRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.infer.WebResponse.deserializeBinary
);


/**
 * @param {!proto.infer.WebRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.infer.WebResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.infer.WebResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.infer.WebClient.prototype.process =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/infer.Web/Process',
      request,
      metadata || {},
      methodDescriptor_Web_Process,
      callback);
};


/**
 * @param {!proto.infer.WebRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.infer.WebResponse>}
 *     Promise that resolves to the response
 */
proto.infer.WebPromiseClient.prototype.process =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/infer.Web/Process',
      request,
      metadata || {},
      methodDescriptor_Web_Process);
};


module.exports = proto.infer;

