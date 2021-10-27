# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: infer.proto
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor.FileDescriptor(
  name='infer.proto',
  package='infer',
  syntax='proto3',
  serialized_options=None,
  create_key=_descriptor._internal_create_key,
  serialized_pb=b'\n\x0binfer.proto\x12\x05infer\"+\n\x0cInferRequest\x12\r\n\x05shape\x18\x01 \x03(\x04\x12\x0c\n\x04\x64\x61ta\x18\x02 \x03(\x02\",\n\rInferResponse\x12\r\n\x05shape\x18\x01 \x03(\x04\x12\x0c\n\x04\x64\x61ta\x18\x02 \x03(\x02\x32;\n\x05Infer\x12\x32\n\x05Infer\x12\x13.infer.InferRequest\x1a\x14.infer.InferResponseb\x06proto3'
)




_INFERREQUEST = _descriptor.Descriptor(
  name='InferRequest',
  full_name='infer.InferRequest',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='shape', full_name='infer.InferRequest.shape', index=0,
      number=1, type=4, cpp_type=4, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='data', full_name='infer.InferRequest.data', index=1,
      number=2, type=2, cpp_type=6, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=22,
  serialized_end=65,
)


_INFERRESPONSE = _descriptor.Descriptor(
  name='InferResponse',
  full_name='infer.InferResponse',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='shape', full_name='infer.InferResponse.shape', index=0,
      number=1, type=4, cpp_type=4, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='data', full_name='infer.InferResponse.data', index=1,
      number=2, type=2, cpp_type=6, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=67,
  serialized_end=111,
)

DESCRIPTOR.message_types_by_name['InferRequest'] = _INFERREQUEST
DESCRIPTOR.message_types_by_name['InferResponse'] = _INFERRESPONSE
_sym_db.RegisterFileDescriptor(DESCRIPTOR)

InferRequest = _reflection.GeneratedProtocolMessageType('InferRequest', (_message.Message,), {
  'DESCRIPTOR' : _INFERREQUEST,
  '__module__' : 'infer_pb2'
  # @@protoc_insertion_point(class_scope:infer.InferRequest)
  })
_sym_db.RegisterMessage(InferRequest)

InferResponse = _reflection.GeneratedProtocolMessageType('InferResponse', (_message.Message,), {
  'DESCRIPTOR' : _INFERRESPONSE,
  '__module__' : 'infer_pb2'
  # @@protoc_insertion_point(class_scope:infer.InferResponse)
  })
_sym_db.RegisterMessage(InferResponse)



_INFER = _descriptor.ServiceDescriptor(
  name='Infer',
  full_name='infer.Infer',
  file=DESCRIPTOR,
  index=0,
  serialized_options=None,
  create_key=_descriptor._internal_create_key,
  serialized_start=113,
  serialized_end=172,
  methods=[
  _descriptor.MethodDescriptor(
    name='Infer',
    full_name='infer.Infer.Infer',
    index=0,
    containing_service=None,
    input_type=_INFERREQUEST,
    output_type=_INFERRESPONSE,
    serialized_options=None,
    create_key=_descriptor._internal_create_key,
  ),
])
_sym_db.RegisterServiceDescriptor(_INFER)

DESCRIPTOR.services_by_name['Infer'] = _INFER

# @@protoc_insertion_point(module_scope)
